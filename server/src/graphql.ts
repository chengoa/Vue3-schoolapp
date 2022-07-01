import {ApolloServer,gql} from "apollo-server-express";
import * as gr from "./graphqlResolvers"
import {defs} from "./graphqlTypeDefs"

const typeDefs = gql `${defs}`

const resolvers = {
    Query:{
        carousel:gr.Carousel,
        course:gr.Course,
        allcourse:gr.AllCourse,
        coursedetail: gr.CourseDetail,
        data: gr.Data,
        member: gr.Member,
        entries: gr.Entries,
        searchmember: gr.SearchMember,
        searchactivity: gr.SearchActivity,
        searchcourse: gr.SearchCourse,
        activity: gr.Activity,
        joinactivity: gr.JoinActivity,
        moments: gr.Moments,
        moment: gr.Moment,
        fontsearch: gr.FontSearch,
        momentsearch: gr.MomentSearch,
        message: gr.Message,
        chatmessage: gr.ChatMessage,
        messagechat: gr.MessageChat,
        historysession: gr.HistorySession,
        userinfo: gr.UserInfo,
        users: gr.Users,
        apply: gr.Apply,
        applys: gr.Applys,
        applying: gr.Applyimg,
        profilemoment: gr.ProfileMoment,
        accountmoments: gr.AccountMoments,
        healthinfo:gr.HealthInfo,
        healthtoday: gr.HealthToday,
        notice: gr.Notice,
        file: gr.File,
        apply_agency: gr.ApplyAgency,
        signin: gr.SigninInfo
        
    },
    Goods:{
        type: gr.goodtype
    },
    Moments:{
        time: gr.formatdate
    },
    Apply:{
        time: gr.formatdate
    },
    Health:{
        time: gr.formatdate
    },
    Notice:{
        time: gr.formatdate
    },
    Messages:{
        createdateutc: gr.formatdate2
    },
    Signin:{
        date: gr.formatdate3
    },
    Carousel:{
        date:gr.formatdate3
    }

}

export const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground:true
})


