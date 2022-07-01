import {Connect} from "./db/Mongo";
import {MD5} from "crypto-js";
import { UserInputError } from "apollo-server-errors";
import { OrderedBulkOperation } from "mongodb";
import moment from "moment";
import { io} from './main'

export const PingDb = async (req:any,resp:any) => {
    try {
        const client = await Connect();
        const db = client.db("school_app")
        const res = await db.command({ping:1})
        if(res.ok === 1){
            resp.send(`连接成功`)
        }else{
            resp.send(`连接失败`)
        }
    } catch (err) {
        console.log(err)
        resp.send(`数据库连接失败`)    
    }
}

export const websocket = async (req:any,resp:any) => {
    try {
        const client = await Connect();
        io.on('connection',(socket: any) => {
            console.log('weriufb')
            socket.emit('news',{hello:'world'})
            socket.on("event",(data: Date) => {
                console.log(data)
            })   
        })
        const db = client.db("school_app")
        const res = await db.command({ping:1})
        if(res.ok === 1){
            resp.send(`连接成功`)
        }else{
            resp.send(`连接失败`)
        }
    } catch (err) {
        console.log(err)
        resp.send(`数据库连接失败`)    
    }
}

export const Login = async (req:any,resp:any) => {
    const p = req.body    
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const user = await db.collection("users").findOne({account:p.account});                                
        if(user){
            if(user.password === p.password){
                resp.json({
                    code:1,
                    msg:"登陆成功",
                    data:{
                        account: user.account,
                        avatar: user.avatar,
                        user: user,
                        _account: user._account
                    }
                })
            }else{
                resp.json({
                    code:2,
                    msg:"密码不正确",
                })
            }
        }else{
           resp.json({
               code:3,
               msg: "您没有身份权限"
           })

        }
    }catch(err){
        resp.send({
            code:-1,
            msg:"检查数据库",
        })
    }
}

export const UploadAvatar = async (req:any,resp:any) => {
    const {file,body} = req
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const query:any = {
            account:body.account
        }
        const update:any = {
            $set:{
                avatar:file.filename
            }
        }
        const res = await db.collection("users").updateOne(query,update)
        if(res.acknowledged === true && res.modifiedCount === 1){
            resp.json({
                code:1,
                msg:"上传成功",
                data:{
                    avatar:file.filename
                }
            })
        }else{
            resp.json({
                code:2,
                msg:"上传失败(未知原因)",
                data:""
            })
        }
    } catch (error) {
        resp.send({
            code:-1,
            msg:"数据库连接失败",
            data:""
        })
    }
}

export const Upload = async (req:any,resp:any) => {
    const {file:{filename}} = req;
    try {
        if(filename){
            resp.json({
                code:1,
                msg:"上传成功",
                data:{
                    filename
                }
            })
        }else{
            resp.json({
                code:2,
                msg:"上传失败(未知原因)",
                data:""
            })
        }
    } catch (error) {
        resp.json({
            code:3,
            msg:"上传失败",
            data:{
                error
            }
        })
    }
}

export const FileInsert = async (req:any,resp:any) => {
    const date = new Date()
    const {...file} = req.body;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("file").insertOne({
            date,
            ...file
        });
        if(res.acknowledged == true){
            resp.json({
                code:1,
                msg:"增加成功",
            })
        }else{
            resp.json({
                code:2,
                msg:"增加失败(未知原因)",
            })
        }           
    } catch (error) {
        resp.send({
            code:-1,
            msg:"连接数据库失败"
        })
    }
}

export const SignInInsert = async (req:any,resp:any) => {
    const date = new Date()
    const {...signin} = req.body;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("signin").insertOne({
            date,
            ...signin
        });
        if(res.acknowledged == true){
            resp.json({
                code:1,
                msg:"签到成功",
            })
        }else{
            resp.json({
                code:2,
                msg:"签到失败(未知原因)",
            })
        }           
    } catch (error) {
        resp.send({
            code:-1,
            msg:"连接数据库失败"
        })
    }
}

export const CarouselInsert = async (req:any,resp:any) => {
    const date = new Date()
    const {src} = req.body;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("carousel").insertOne({
            date,
            src
        });
        if(res.acknowledged == true){
            resp.json({
                code:1,
                msg:"新增成功",
            })
        }else{
            resp.json({
                code:2,
                msg:"新增失败(未知原因)",
            })
        }           
    } catch (error) {
        resp.send({
            code:-1,
            msg:"连接数据库失败"
        })
    }
}

export const CarouselDel = async (req:any,resp:any) => {  
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("carousel").deleteOne({
            src: req.body.src
        })
        if(res.acknowledged === true && res.deletedCount === 1){
            resp.json({
                code:1,
                msg:"删除成功",
                data:""
            })
        }else{
            resp.json({
                code:2,
                msg:"删除失败(未知原因)",
                data:""
            })
        }
    } catch (error) {
        resp.json({
            code:2,
            msg:"数据库异常",
            data:""
        })
    }
}

export const FileDel = async (req:any,resp:any) => {  
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("file").deleteOne({
            title: req.body.title
        })
        if(res.acknowledged === true && res.deletedCount === 1){
            resp.json({
                code:1,
                msg:"删除成功",
                data:""
            })
        }else{
            resp.json({
                code:2,
                msg:"删除失败(未知原因)",
                data:""
            })
        }
    } catch (error) {
        resp.json({
            code:2,
            msg:"数据库异常",
            data:""
        })
    }
}

export const NoticeInsert = async (req:any,resp:any) => {
    const time = new Date()
    const {content} = req.body;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("notice").insertOne({
            time,
            content
        });
        if(res.acknowledged == true){
            resp.json({
                code:1,
                msg:"增加成功",
            })
        }else{
            resp.json({
                code:2,
                msg:"增加失败(未知原因)",
            })
        }           
    } catch (error) {
        resp.send({
            code:-1,
            msg:"连接数据库失败"
        })
    }
}

export const ActivityInsert = async (req:any,resp:any) => {
    const { account,...content} = req.body;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("users").updateOne({account:account},{$push:{activities:content}});
        if(res.acknowledged === true && res.matchedCount == 1){
            resp.json({
                code:1,
                msg:"增加成功",
                data:""
            })
        }else{
            resp.json({
                code:2,
                msg:"增加失败(未知原因)",
                data:""
            })
        }     
    
        
    } catch (error) {
        console.log(error)
    }
}

export const ActivityDel = async (req:any,resp:any) => {
    const { account,activity} = req.body;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("users").updateOne({account:account},{$pull:{activities:{activity:activity}}});
        if(res.acknowledged === true && res.matchedCount == 1){
            resp.json({
                code:1,
                msg:"删除成功",
                data:""
            })
        }else{
            resp.json({
                code:2,
                msg:"删除失败(未知原因)",
                data:""
            })
        }       
    } catch (error) {
        resp.send({
            code:-1,
            msg:"连接数据库失败"
        })
    }
}

export const ReportInsert = async (req:any,resp:any) => {
    // 1.拿到页面传来的参数
    const p = req.body // {details:[],userid:""} object   
    try {
        // 2.连接数据库
        const client = await Connect();
        // 3.切换数据库
        const db = client.db("school_app");
      
        const date = new Date()
        p.time = new Date()
        const res = await db.collection("healthreport").insertOne(p)
        if(res.acknowledged == true){
            resp.json({
                code:1,
                msg:"创建成功"
            })
        }else{
            resp.json({
                code:2,
                msg:"创建订单失败"
            })
        }
    } catch (error) {
        resp.send({
            code:-1,
            msg:"连接数据库失败"
        })
    }
    
}

export const LeaveApplyInsert = async (req:any,resp:any) => {
    // 1.拿到页面传来的参数
    const p = req.body // {details:[],userid:""} object   
    try {
        // 2.连接数据库
        const client = await Connect();
        // 3.切换数据库
        const db = client.db("school_app");
      
        const date = new Date()
        p.time = new Date()
        const res = await db.collection("leaveapply").insertOne(p)
        if(res.acknowledged == true){
            resp.json({
                code:1,
                msg:"创建成功"
            })
        }else{
            resp.json({
                code:2,
                msg:"创建订单失败"
            })
        }
    } catch (error) {
        resp.send({
            code:-1,
            msg:"连接数据库失败"
        })
    }
    
}

export const UpdataApply = async(req:any,resp:any) => {
    const {id,status} = req.body
    try {
        const client = await Connect();
        try {
            const db = client.db("school_app");
            const res = await db.collection("leaveapply").updateOne({reason:id},{$set:{status:status}}) ;
            if(res.acknowledged === true && res.matchedCount == 1){
                resp.json({
                    code:1,
                    msg:"操作成功",
                })
            }else{
                resp.json({
                    code:2,
                    msg:"失败(未知原因)",
                })
            }     
            return res
        } catch (e) {
            return e
        } finally {
            client.close();
        }
    } catch (error) {
        return error
    }
}

export const MomentInsert = async (req:any,resp:any) => {
    // 1.拿到页面传来的参数
    const p = req.body // {details:[],userid:""} object   
    try {
        // 2.连接数据库
        const client = await Connect();
        // 3.切换数据库
        const db = client.db("school_app");
      
        const date = new Date()
        p.time = new Date()
        const res = await db.collection("moments").insertOne(p)
        if(res.acknowledged == true){
            resp.json({
                code:1,
                msg:"创建成功"
            })
        }else{
            resp.json({
                code:2,
                msg:"创建订单失败"
            })
        }
    } catch (error) {
        resp.send({
            code:-1,
            msg:"连接数据库失败"
        })
    }
    
}

export const BarrageUpdate = async (req:any,resp:any) => {
    const { title,send} = req.body;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("course").updateOne({title:title},{$push:{barrage:send._value}});
        if(res.acknowledged === true && res.matchedCount == 1){
            resp.json({
                code:1,
                msg:"添加弹幕成功",
            })
        }else{
            resp.json({
                code:2,
                msg:"添加失败(未知原因)",
            })
        }     
    
        
    } catch (error) {
        console.log(error)
    }
}

export const FabulousInsert = async (req:any,resp:any) => {
    const { content,account,avatar} = req.body;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("moments").updateOne({content:content},{$push:{likes:{account,avatar}}});
        if(res.acknowledged === true && res.matchedCount == 1){
            resp.json({
                code:1,
                msg:"点赞",
            })
        }else{
            resp.json({
                code:2,
                msg:"点赞失败(未知原因)",
            })
        }     
    
        
    } catch (error) {
        console.log(error)
    }
}

export const CommentInsert = async (req:any,resp:any) => {
    const { item,...comment} = req.body;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("moments").updateOne({content:item},{$push:{comment:comment}});
        if(res.acknowledged === true && res.matchedCount == 1){
            resp.json({
                code:1,
                msg:"添加弹幕成功",
            })
        }else{
            resp.json({
                code:2,
                msg:"添加失败(未知原因)",
            })
        }     
    
        
    } catch (error) {
        console.log(error)
    }
}

export const AdminLogin = async (req:any,resp:any) => {
    const p = req.body     
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const user = await db.collection("admin").findOne({user:p.user});                                
        if(user){
            if(user.pwd === p.pwd){
                const token = MD5(p.user+p.pwd).toString()
                resp.json({
                    code:1,
                    msg:"登陆成功",
                    data:{
                        user: user.user,
                        token                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                    }
                })
            }else{
                resp.json({
                    code:2,
                    msg:"密码不正确",
                })
            }
        }else{
           resp.json({
               code:3,
               msg: "您没有身份权限"
           })

        }
    }catch(err){
        resp.send({
            code:-1,
            msg:"检查数据库",
        })
    }
}

// export const Account = async (req:any,resp:any) => {
//     try {
//         const client = await Connect();
//         const db = client.db("school_app")
//         const res = await db.collection("users").findOne();  
//         if(res.ok === 1){
//             resp.send(`连接成功`)
//         }else{
//             resp.send(`连接失败`)
//         }
//     } catch (err) {
//         console.log(err)
//         resp.send(`数据库连接失败`)    
//     }
// }

export const GetData = async (req:any,resp:any) => {
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const limit = 5;
        const res = await db.collection("activity").find().toArray();  
        let pages = Math.ceil(res.length / limit);        
        resp.json({
            data: res,
            limit: limit,
            pages: pages,
            entries: res.length
            // entries: entries
        })        
    } catch (error) {
        console.log(error);  
    }
}

export const GetCards = async (req:any,resp:any) => {
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("calendarcard").find().toArray();
        resp.json({
            data: res,
        })        
    } catch (error) {
        console.log(error);  
    }
}

export const PushCard = async (req:any,resp:any) => {
    // 1.拿到页面传来的参数
    const content = req.body.content._value
    const {time,account} = req.body.card // {details:[],userid:""} object   
    try {
        // 2.连接数据库
        const client = await Connect();
        // 3.切换数据库
        const db = client.db("school_app");
      
        
        // 4.通过db创建订单 = 插入数据
        // const date = new Date()
        // p.id = MD5(date.getUTCMilliseconds().toString()).toString()
        // p.status = "1";
        // p.sysdate = new Date()
        const res = await db.collection("calendarcard").insertOne({
            time,
            account,
            content
        })
        if(res.acknowledged == true){
            resp.json({
                code:1,
                msg:"创建成功"
            })
        }else{
            resp.json({
                code:2,
                msg:"创建失败"
            })
        }
    } catch (error) {
        resp.send({
            code:-1,
            msg:"连接数据库失败"
        })
    }
    
}

export const PushChat = async (req:any,resp:any) => {
    // 1.拿到页面传来的参数
    const p = req.body // {details:[],userid:""} object   
    try {
        // 2.连接数据库
        const client = await Connect();
        // 3.切换数据库
        const db = client.db("school_app");
      
        
        // 4.通过db创建订单 = 插入数据
        // const date = new Date()
        // p.id = MD5(date.getUTCMilliseconds().toString()).toString()
        // p.status = "1";
        // p.sysdate = new Date()
        const res = await db.collection("message").insertOne(p)
        if(res.acknowledged == true){
            resp.json({
                code:1,
                msg:"创建成功"
            })
        }else{
            resp.json({
                code:2,
                msg:"创建订单失败"
            })
        }
    } catch (error) {
        resp.send({
            code:-1,
            msg:"连接数据库失败"
        })
    }
    
}

export const CalendarDel = async (req:any,resp:any) => {  
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("calendarcard").deleteOne({
            content: req.body.content
        })
        if(res.acknowledged === true && res.deletedCount === 1){
            resp.json({
                code:1,
                msg:"删除成功",
                data:""
            })
        }else{
            resp.json({
                code:2,
                msg:"删除失败(未知原因)",
                data:""
            })
        }
    } catch (error) {
        resp.json({
            code:2,
            msg:"数据库异常",
            data:""
        })
    }
}

export const Del = async (req:any,resp:any) => {   
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("calendarcard").deleteOne({
            content: req.body.id
        })
        if(res.acknowledged === true && res.deletedCount === 1){
            resp.json({
                code:1,
                msg:"删除成功",
                data:""
            })
        }else{
            resp.json({
                code:2,
                msg:"删除失败(未知原因)",
                data:""
            })
        }
    } catch (error) {
        resp.json({
            code:2,
            msg:"数据库异常",
            data:""
        })
    }
}
export const AdminDel = async (req:any,resp:any) => {
    const p = req.body;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("users").deleteOne({
            _account: p._account
        })
        if(res.acknowledged === true && res.deletedCount === 1){
            resp.json({
                code:1,
                msg:"删除成功",
                data:""
            })
        }else{
            resp.json({
                code:2,
                msg:"删除失败(未知原因)",
                data:""
            })
        }
    } catch (error) {
        resp.json({
            code:2,
            msg:"数据库异常",
            data:""
        })
    }
}

export const CourseDel = async (req:any,resp:any) => {
    const p = req.body;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("course").deleteOne({
            title: p.title
        })
        if(res.acknowledged === true && res.deletedCount === 1){
            resp.json({
                code:1,
                msg:"删除成功",
                data:""
            })
        }else{
            resp.json({
                code:2,
                msg:"删除失败(未知原因)",
                data:""
            })
        }
    } catch (error) {
        resp.json({
            code:2,
            msg:"数据库异常",
            data:""
        })
    }
}

export const CourseInsert = async (req:any,resp:any) => {
    const { img, ...form} = req.body;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const res = await db.collection("course").insertOne({
            img,
            ...form
        });
        if(res.acknowledged === true ){
            resp.json({
                code:1,
                msg:"添加成功",
            })
        }else{
            resp.json({
                code:2,
                msg:"添加失败(未知原因)",
            })
        }     
    
        
    } catch (error) {
        console.log(error)
    }
}

export const Updata = async (req:any,resp:any) => {
    const { name, contact, status} = req.body.item;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        await db.collection("users").deleteOne({_contact: contact})
        const res = await db.collection("users").insertOne(req.body.item) 
        if(res.acknowledged === true){
            resp.json({
                code:1,
                msg:"修改成功",
                data:""
            })
        }else{
            resp.json({
                code:2,
                msg:"修改失败(未知原因)",
                data:""
            })
        }        
    } catch (error) {
        console.log(error)
    }
}

export const Insert = async (req:any,resp:any) => {
    const { _account} = req.body.content;
    try {
        const client = await Connect();
        const db = client.db("school_app");
        const load = await db.collection("users").findOne({_account: _account });
        if(load) {
            resp.json({
                code: 3,
                msg: "用户联系方式已存在"
            })
        }else{
            const res = await db.collection("users").insertOne(req.body.content)  
            if(res.acknowledged === true){
                resp.json({
                    code:1,
                    msg:"增加成功",
                    data:""
                })
            }else{
                resp.json({
                    code:2,
                    msg:"增加失败(未知原因)",
                    data:""
                })
            }     
        }
        
    } catch (error) {
        console.log(error)
    }
}





