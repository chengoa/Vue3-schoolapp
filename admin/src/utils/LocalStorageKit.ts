export const getArray = function(key:string):string[]{
    let val = localStorage.getItem(key);       // val type is string  "a,b,c"
    return val === null ? [] : val.split(",")  // ["a","b","c"]
}

export const setArray = (key:string,val:any) => {
    // const arr = getArray(key);      // ["a","b","c"]
    // const index= arr.indexOf(val);  // 校验原数组中是否含有本次查询的val，如果有会把所在位置的索引返回来
    // if(index >= 0){
    //     arr.splice(index,1);        // 如果存在原数组中，用splice进行删除
    // }
    const arr = [...new Set(getArray(key))]
    arr.unshift(val);               // 在数组最前面插入新值
    localStorage.setItem(key,arr.toString());
}

export const clearItem = (key:string) => {
    localStorage.removeItem(key)
}

export const getCacheVal = (key:string) : string => {
    return localStorage.getItem(key)
}

export const setCacheVal = (key:string,val:any) => {
    localStorage.setItem(key,val)
}

export const clearCache = () => {
    localStorage.clear()
}

Storage.prototype.setExpire = (key:string, value:string, expire:any) => {
	let obj = {
	data: value,
	time: Date.now(),
	expire: expire
	};
	//localStorage 设置的值不能为对象,转为json字符串
	localStorage.setItem(key, JSON.stringify(obj));
}

// interface Val {
//     time: any,
//     data: any,
//     expire: any
// }

// Storage.prototype.getExpire = (key:string) => {
//     let val  = localStorage.getItem(key);
//     if (!val) {
//         return val;
//     }
//     val = JSON.parse(val);
//     if (Date.now() - val.time > val.expire) {
//         localStorage.removeItem(key);
//         return null;
//     }
//     return val.data;
// }