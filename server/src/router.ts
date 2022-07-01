import {Express} from "express"
import * as api from "./api"
// import {Connect} from "./db/Mongo"
import * as middleware from "./middleware"

export const useRouter = (app:Express) => {

    app.get("/pingdb",api.PingDb)
    
    app.post("/api/login",api.Login)

    app.post("/api/adminlogin",api.AdminLogin)

    app.post("/api/admindel",api.AdminDel)

    app.post("/api/pushcard",api.PushCard)

    app.post("/api/pushchat",api.PushChat)


    app.post("/api/activityinsert",api.ActivityInsert)

    app.post("/api/activitydel",api.ActivityDel)

    app.post("/api/reportinsert",api.ReportInsert)

    app.post("/api/leaveapplyinsert",api.LeaveApplyInsert)

    app.post("/api/updataapply",api.UpdataApply)

    app.post("/api/momentinsert",api.MomentInsert)

    app.post("/api/barrageupdate",api.BarrageUpdate)

    app.post("/api/fabulousinsert",api.FabulousInsert)

    app.post("/api/commentinsert",api.CommentInsert)

    app.post("/api/coursedel",api.CourseDel)

    app.post("/api/courseinsert",api.CourseInsert)

    app.post("/api/getcards",api.GetCards)

    app.post("/api/getdata",api.GetData)

    app.post("/api/del",api.Del)

    app.post("/api/calendardel",api.CalendarDel)

    app.post("/api/updata",api.Updata)

    app.post("/api/insert",api.Insert)

    app.post("/api/fileinsert",api.FileInsert)

    app.post("/api/filedel",api.FileDel)

    app.post("/api/signin",api.SignInInsert)

    app.post("/api/noticeinsert",api.NoticeInsert)

    app.post("/api/carouselinsert",api.CarouselInsert)

    app.post("/api/carouseldel",api.CarouselDel)

    // app.post("/api/uploadImg",middleware.upload.single("file"),api.uploadImg)

    app.post("/api/uploadavatar",middleware.upload.single("file"),api.UploadAvatar)

    app.post("/api/upload",middleware.upload.single("file"),api.Upload)



    // app.post("/api/uploadavatar",middleware.upload.single("file"),api.UploadAvatar)

}