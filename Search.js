class Search { // this is search
	constructor(){
		this.stopSearch=false;
		this.tmp;
	}
	//emergency stop
	stop(){
		this.stopSearch=true;
	}
	executeSearch(searchTerm, search_type, path, options, seen = new WeakMap()) {
	  if (seen.has(path)) return "Loop";
	  if (this.stopSearch) return "search abruply stopped"
	  if (path !== null && typeof path == 'object') seen.set(path, true);
		
	  const filtered = {};
	  for (const key in path) {
		if (!Object.prototype.hasOwnProperty.call(path, key)) continue;
		var value=path[key];
		var isKeyMatch=String(key).toLowerCase()[search_type](searchTerm.toLowerCase());
		if (value === null) continue;
		else if((typeof value !== "object" && typeof value !== 'function') && (String(value).toLowerCase()[search_type](searchTerm.toLowerCase()) || isKeyMatch)) {
			var tmp=String(value);
			if (tmp.length <50) {
				filtered[key]=value;
			} else filtered[key]="string too long."+tmp.length;
		} 
		else if (Array.isArray(value) && options.incArr)  filtered[key] = value.filter(item => this.arrCheck(item, searchTerm, search_type, options)).map(item => item !== null && typeof item === "object" ? this.executeSearch(searchTerm, search_type, item, options, seen) : item);
		else if (typeof value == 'function' && options.incFunc && isKeyMatch) filtered[key]="function";
		else if (typeof value == 'object' && options.incObj) {
			this.tmp=this.executeSearch(searchTerm, search_type, value, options, seen);
			if (this.tmp!=="Loop") if (Object.keys(this.tmp).length !== 0) filtered[key]=this.tmp;
			else if (isKeyMatch) filtered[key]={"info": "content deleted due to no similarity in any form."};
		}
	  }
	  return filtered;
	}
	
	arrCheck(item, searchTerm, search_type , options){
		//just to check function or not.
	  if (item === null) return false;
	  else if ((typeof item !== "object" && typeof item !== 'function') && String(item).toLowerCase()[search_type](searchTerm.toLowerCase())) return true;
	  else if (typeof item == 'function' && options.incFunc && String(item).toLowerCase()[search_type](searchTerm.toLowerCase())) return true;
	  else if (typeof item == 'object' && options.incObj) return true;
	  return false;
	}

	// 🧹 Cleaner: recursively remove empty {}
  cleanEmptyDeep(obj) {
  if (typeof obj === 'string') {
    // Remove "Loop" strings
    return obj === "Loop" ? undefined : obj;
  }

  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    const cleanedArray = obj
      .map(this.cleanEmptyDeep.bind(this))
      .filter(
        x =>
          x !== undefined &&
          !(
            typeof x === 'object' &&
            x !== null &&
            (
              (Array.isArray(x) && x.length === 0) ||
              (!Array.isArray(x) && Object.keys(x).length === 0)
            )
          )
      );
    return cleanedArray.length > 0 ? cleanedArray : undefined;
  }

  const cleaned = {};
  for (const k in obj) {
    const v = this.cleanEmptyDeep(obj[k]);
    if (v === undefined) continue;
    if (typeof v === 'object' && v !== null) {
      if (Array.isArray(v) && v.length === 0) continue;
      if (!Array.isArray(v) && Object.keys(v).length === 0) continue;
    }
    cleaned[k] = v;
  }

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

  // 🧹 Repeat until stable
  cleanUntilStable(obj) {
	let prev = obj;
	let next = this.cleanEmptyDeep(prev);
	while (JSON.stringify(prev) !== JSON.stringify(next)) {
	  prev = next;
	  next = this.cleanEmptyDeep(prev);
	}
	return next;
  }
	
	search(searchTerm, path, strPath, search_type=1, options={ incArr: true, incFunc: false, incObj: true }) {
	//check inputs
		if (search_type == "0") search_type = "startsWith";
		else if (search_type == "1") search_type = "includes";
		else if (search_type == "2") search_type = "endsWith";
		else return 'failed, search type is not recognized!';
		
		if (searchTerm=="") return 'failed, Search key is blank!';
		
		if (typeof path==="undefined") return 'failed, path undefined!';
		
		for (const key in options)
			if (typeof options[key]!=="boolean") return "option "+key+" is not boolean";

		//init
		this.stopSearch = false;
		//execute
		console.log("searching...");
		var tmp = this.executeSearch(searchTerm, search_type, path, options);
		tmp = this.cleanUntilStable(tmp);
		console.log("result search from path '"+strPath+"'");
		return tmp;
	}
}

module.exports = Search;