import {Connect} from "./db/Mongo";
import moment from "moment";
import {MD5} from "crypto-js";
import { query } from "express";

export const Activity = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const result = await db.collection("activity").find().toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Notice = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const result = await db.collection("notice").find().sort({'time':-1}).limit(1).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Carousel = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const result = await db.collection("carousel").find().limit(args.limit).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Course = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const result = await db.collection("course").find().limit(args.limit).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const AllCourse = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const result = await db.collection("course").find().toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const CourseDetail = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
                title: args.title
            }
            const result = await db.collection("course").findOne(query)
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Apply = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
                status: {$ne:1}
            }
            const result = await db.collection("leaveapply").find(query).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Applyimg = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
                status: 0
            }
            const result = await db.collection("leaveapply").find(query).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Applys = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const result = await db.collection("leaveapply").find().sort({'time':-1}).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const ApplyAgency = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
                _account:args._account
            };
            const result = await db.collection("leaveapply").find(query).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const HealthInfo = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const result = await db.collection("healthreport").find().sort({'time':-1}).toArray();
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const SigninInfo = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const result = await db.collection("signin").find().sort({'date':-1}).toArray();
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const HealthToday = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
                time:args.time
            };
            const result = await db.collection("healthreport").find(query).sort({'time':-1}).toArray();
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Message = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
                reciverid: args.reciverid
            }
            const result = await db.collection("message").find(query).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const ChatMessage = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
                sendid: args.account,
                reciverid: args.id
            }
            
            const result = await db.collection("message").find(query).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const MessageChat = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
                sendid: args.account,
                reciverid: args.id
            }
            
            const result = await db.collection("message").find(query).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const HistorySession = async(parent:any,args:any) => {
    console.log(parent,args)
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const aggregate:any = [
                {$unwind:"$historysessionlist"},
                {$match:{
                    _account:args.account,
                   
                }},
                {$project:{"historysessionlist":1}}

            ]
            const result = await db.collection("users").aggregate(aggregate)
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const JoinActivity = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
                account:args.account
            };
            const result = await db.collection("users").findOne(query);
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const UserInfo = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
               
                "_account":args.account
                
            };
            const result = await db.collection("users").findOne(query);
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Users = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const result = await db.collection("users").find().toArray();
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const CalendarCard = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
                time:args.time
            };
            const result = await db.collection("calendarcard").find(query).sort({'time':-1}).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Moments = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            
            const result = await db.collection("moments").find().sort({'time':-1}).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const File = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            
            const result = await db.collection("file").find().sort({'date':-1}).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const AccountMoments = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
                _account:args.account
            };
            const result = await db.collection("moments").find(query).sort({'time':-1}).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Moment = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {
                content:args.content
            };
            const result = await db.collection("moments").findOne(query)
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const ProfileMoment = async(parent:any,args:any) => {
    const account = args.account
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const result = await db.collection("moments").find({likes:{$elemMatch:{account}}}).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const FontSearch = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {};
            if(args.name) {
                query.name = {
                    $regex:args.name
                }
                const res = await db.collection("users").find(query).toArray();            
                return res;

            }
            
           
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const MomentSearch = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {};
            
                if(args.name) {
                    query.name = {
                        $regex:args.name
                    }
                const res = await db.collection("moments").find(query).toArray();            
                return res;
            }
            
           
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Data = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("crdc");
            const result = await db.collection("data").find().toArray();            
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Member = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const result = await db.collection("users").find().skip(args.start).limit(args.count).toArray();
            return result;
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Entries = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const entries = await db.collection("users").find().toArray();
            return entries;
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}



export const formatdate = async (parent:any,args:any) => {
    return moment(parent.time).format("yyyy-MM-DD HH:mm:ss");
}

export const formatdate2 = async (parent:any,args:any) => {
    return moment(parent.createdateutc).format("yyyy-MM-DD HH:mm:ss");
}

export const formatdate3 = async (parent:any,args:any) => {
    return moment(parent.date).format("yyyy-MM-DD HH:mm:ss");
}

export const Hello = (parent:any,args:any) => {
    return "hello graphql"
}

export const Tabbar = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("my_vue_app");
            const result = await db.collection("tabbar").find().limit(args.limit).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const SearchMember = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {};
            if (args.type) query.type = { $in:args.type } 
            if (args.name) {
                query.name = {
                    $regex:args.name
                }
            } 
            const res = await db.collection("users").find(query).toArray();            
            return res;
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const SearchActivity = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {};
            if (args.name) {
                query.rank = {
                    $regex:args.name
                }
            } 
            const res = await db.collection("activity").find(query).toArray();            
            return res;
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const SearchCourse = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const query:any = {};
            if (args.name) {              
                query.teacher = {
                    $regex:args.name
                }   
            } 
            const res = await db.collection("course").find(query).toArray();            
            return res;
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Tubes = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("my_vue_app");
            const result = await db.collection("tubes").find().toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Resgoods = async (parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("my_vue_app"); // 找到数据库
            const query:any = {};
            if (args.type) query.type = { $in:args.type }  // 语法糖的写法
            if (args.name) {
                query.name = {
                    $regex:args.name
                }
            } 
            if (args.origin) {
                query.origin = {
                    $regex:args.origin
                }
            } 
            const result = await db.collection("goods").find(query).skip(args.start).limit(args.count).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Order = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("my_vue_app");
            const query:any = {
                id:args.id
            };
            const result = await db.collection("order").findOne(query)
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const AllOrder = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("my_vue_app");
            const result = await db.collection("order").find().skip(args.start).limit(args.count).toArray()            
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const TypeGoods = async (parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("my_vue_app"); // 找到数据库
            const query:any = {
                type:args.type
            };
            // db.表名.find(json对象形式的查询语句)
            // db.goods.find({type:"03"}) 根据类型查 很多条记录 思考：能不能从中取出n条数据
            // db.goods.find({type:"03"}).limit(n) 可以使用limit 过滤出n条记录
            // db.goods.find({type:"03"}).limit(n).skip(start) 可以利用limit skip这两个方法达到从几条到第几条的数据的效果
            const result = await db.collection("goods").find(query).toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const goodtype = async (parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("my_vue_app"); // 找到数据库
            // 下面写的是mongodb的一种特殊查询语法,aggregate一般用在嵌套的数据结构，而且你还想查询或返回内层的数据
            const aggregate:any = [
                {$unwind:"$items"},
                {$match:{
                    id:args.id,
                    "items.id":parent.type
                }},
                {$project:{"items":1}}
            ]
            const result = await db.collection("dict").aggregate(aggregate).toArray()
            return result[0].items;
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}



export const Carddata = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("my_vue_app");
            const result = await db.collection("carddata").find().toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const Hotwords = async(parent:any,args:any) => {
    try {
        const client = await Connect();
        try {
            const db = client.db("my_vue_app");
            const result = await db.collection("hotwords").find().toArray()
            return result
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}
// export const HomeTopData = (parent:any,args:any) => {
//     console.log(parent) //null
//     console.log(args)
//     return homeTopData.slice(0,args.limit)
// }

// export const HomeTopDataDb = async (parent:any,args:any) => {
//     try {
//         const client = await Connect();
//         try {
//             console.log("this is db query")
//             const db = client.db("test");
//             const result = await db.collection("hometopdata").find().limit(args.limit).toArray()
//             return result
//         } catch (e) {
//             return e
//         } finally {
//             client.close();
//         }
//     } catch (error) {
//         return error
//     }
// }

// export const personOrderDb = async (parent:any,args:any) => {
//     try {
//         const client = await Connect();
//         try {
//             console.log("this is db query personOrder")
//             const db = client.db("test");
//             const result = await db.collection("personOrder").find().limit(args.limit).toArray()
//             return result
//         } catch (e) {
//             return e
//         } finally {
//             client.close();
//         }
//     } catch (error) {
//         return error
//     }
// }

// export const HomeMovies = (parent: any, args: any) => {
//     console.log(args)
//     return homeMovies
// }

// export const HomeMoviesDb = async (parent: any, _args: any,context:any,info:any) => {
//     try {
//         const client = await Connect();
//         try {
//             console.log("this is db query")
//             const db = client.db("test");
//             const result = await db.collection("homemovies").find().toArray()
//             return result
//         } catch (e) {
//             return e
//         } finally {
//             client.close();
//         }
//     } catch (error) {
//         return error
//     }
// }

// export const SearchDb =  async (parent:any,args:any) => {
//     const params = args;
//     console.log("获取的参数:",params)
//     console.log("原始数据",HomeMoviesDb)
//     console.log("search for db")
//     const client = await Connect();
//     const db = client.db("test");
//     try {
//         // db.homemovies.find({title:{$regex:'3'}})
//         const result = params.content ? await db.collection("homemovies").find({title:{$regex:`${params.content}`}}).toArray()  : await db.collection("homemovies").find().limit(params.limit).toArray() 
//         return result
//     } catch (e) {
//         return e
//     } finally {
//         client.close()
//     }
// }

// export const HomeDates = (parent: any, args: any) => {
//     console.log(args)
//     return homeDates
// }
// export const HomeDatesDb = async (parent: any, _args: any) => {
//     try {
//         const client = await Connect();
//         try {
//             console.log("this is db queryaaaaaa")
//             const db = client.db("test");
//             console.log(_args.id)
//             const result = _args.id ? await db.collection("homedates").find({ id: _args.id }).toArray() : await db.collection("homedates").find().toArray()
//             return result
//         } catch (e) {
//             return e
//         } finally {
//             client.close();
//         }
//     } catch (error) {
//         return error
//     }
// }
// export const HomeFuture = async (parent: any, args: any) => {
//     return homeFuture
// }

// export const HomeFutureDb = async (parent: any, _args: any) => {
//     return parent.homefuture
// }
// export const DataList = async (parent: any, args: any) => {
//     return dataList
// }
// export const DataListDb = async (parent: any, _args: any) => {
//     try {
//         const client = await Connect();
//         try {
//             console.log("this is db query")
//             const db = client.db("test");
//             const result = await db.collection("dataList").find().toArray()
//             return result
//         } catch (e) {
//             return e
//         } finally {
//             client.close();
//         }
//     } catch (error) {
//         return error
//     }
// }
