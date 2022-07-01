export const defs = `
type Query {
    carousel(limit:Int!):[Carousel],
    course(limit:Int!):[Course],
    allcourse:[Course],
    data: [Data],
    member(start:Int!,count:Int!): [Member],
    entries: [Member],
    searchmember(name:String,grade:Int): [Member],
    searchactivity(name:String):[Activity],
    searchcourse(name:String):[Course],
    carlendarcard(time: String!): [Card],
    activity:[Activity],
    joinactivity(account: String!): Activities,
    moments:[ Moments],
    moment(content:String!):Moments,
    fontsearch(name:String,content:String):[UserInfo],
    momentsearch(name:String):[Moments]
    coursedetail(title:String!):Course,
    message(reciverid:String!):[Messages],
    chatmessage(account:String!,id:String!):[Messages],
    messagechat(account:String!,id:String!):[Messages],
    historysession(account:String!):[HistorySession],
    userinfo(account:String):UserInfo,
    users:[UserInfo],
    apply:[Apply],
    applys:[Apply],
    applying:[Apply]
    profilemoment(account:String!):[Moments],
    accountmoments(account:String!):[Moments],
    healthinfo:[Health],
    healthtoday(time:String!):[Health],
    notice:[Notice],
    file:[File],
    apply_agency(_account:String!):[Apply],
    signin:[Signin]
}

type Signin {
    date:String,
    _account:String,
    area:[String],
    text:String
}

type Notice {
    time:String,
    content:String
}

type File {
    date:String,
    content:String,
    title:String,
    img:String
}

type Carousel {
    src: String,
    date:String
}

type Course {
    src:String,
    title:String,
    date:String,
    duration:String,
    teacher:String,
    img:String,
    barrage: [String]
   
}

type Messages {
    content:String,
    createdateutc:String,
    sendid:String,
    reciverid:String,
    avatar:String
}

type HistorySession {
    historysessionlist:[List]
}

type List {
    contentid:String,
    content:[ListContent]
}
type ListContent {
    type:String,
    word:String,
    time:String
}

type Apply {
    _account:String,
    time:String,
    reason:String,
    duration:String,
    destination:String,
    contact:String,
    num:String,
    status:Int,
    _id:String
}

type Health {
    _account:String,
    code:String,
    health:String,
    temperature:Int,
    remarks:String,
    data:String,
    time:String
}

type Card {
    time: String,
    content: String
}

type Activity {
    rank:String,
    titile:String,
    img:String,
    content:String,
    quota:Int,
    applicants:Int,
    deadline:String
}

type Moments {
    _account:String,
    time:String,
    content: String,
    topic: String,
    img:String,
    likes:[Like],
    avatar:String,
    name:String,
    local:String,
    comment: [Comment]
}

type Like {
    account:String,
    avatar:String
}

type Comment {
    account:String,
    time:String,
    content:String,
    avatar:String
}

type Activities {
    activities: [JoinAct]
}

type JoinAct {
    activity:String,
    img:String,
    deadline:String,
    date:String
}

type Result {
    name:String,
    avatar:String,
    content:String,
    time:String

}

type Data {
    location: String,
    nums: Int,
    time: String
}


type Member {
    _account: String,
    avatar: String,
    name: String,
    sex: String,
    grade: Int,
    status:String
}

type UserInfo {
    avatar: String,
    name: String,
    nickname:String,
    sex: String,
    grade: Int,
    _account:String,

}
type Details {
    name: String,
    price: Float,
    origin: String,
    title: String,
    imgs: [String],
    decr: String,
    countbuy: Int
}
type Order {
    id: String,
    status: Int,
    price:Float,
    sysdate: String,
    userid: String,
    details:[Details]
}



type Tabbar {
    path: String,
    iconpath: String,
    iconfill: String
  
}



type Tubes {
    name: String,
    url: String
}

type Carddata {
    src: String,
    span: String,
    operate: String
}

type Hotwords {
    word:String
}



type Goods {
    name: String,
    price: Float,
    origin: String,
    title: String,
    imgs: [String],
    decr: String,
    type (id:String): Dict
}


type Dict {
    id:String,
    name:String,
    sort:Int
}




`