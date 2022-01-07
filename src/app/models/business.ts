export interface Business {
    name: string;
    nameForShow: string;
    subTab: string;
    subAssociateTab: SubAssociateTab[];
    gridHeader: GirdeHeader[];
}

export interface GirdeHeader {
    headerName: string;
    field: string;
}

export interface SubAssociateTab {
    name: string;
    nameforShow: string;
}

export const businessList: Business[] = [
    {
        name: 'information',
        nameForShow: '基本信息',
        subTab: 'informationInfo',
        subAssociateTab: null,
        gridHeader: [
            {
                headerName: '课程',
                field: 'courseName'
            },
            {
                headerName: '教材',
                field: 'textbook'
            }
        ]
    },
    {
        name: 'course',
        nameForShow: '课程',
        subTab: 'courseInfo',
        subAssociateTab: null,
        gridHeader: [
            {
                headerName: '课程',
                field: 'courseName'
            },
            {
                headerName: '教材',
                field: 'textbook'
            }
        ]
    },
    {
        name: 'major',
        nameForShow: '专业',
        subTab: 'majorInfo',
        subAssociateTab: null,
        gridHeader: [
            {
                headerName: '级',
                field: 'grade'
            },
            {
                headerName: '院系',
                field: 'department'
            },
            {
                headerName: '专业',
                field: 'majorName'
            }
        ]
    },
    {
        name: 'teacher',
        nameForShow: '教师',
        subTab: 'teacherInfo',
        subAssociateTab: null,
        gridHeader: [
            {
                headerName: '姓名',
                field: 'name'
            },
            {
                headerName: '教师号',
                field: 'teacherNumber'
            },
            {
                headerName: '教师状态',
                field: 'teacherStatus'
            },
            {
                headerName: '简介',
                field: 'teacherComment'
            },
            {
                headerName: '电话号码',
                field: 'phoneNumber'
            },
            {
                headerName: '是否是导员',
                field: 'isMentor'
            }
        ]
    },
    {
        name: 'class',
        nameForShow: '班级',
        subTab: 'classInfo',
        subAssociateTab: [
            {
                name: 'majorAssociate',
                nameforShow: '选择专业'
            },
            {
                name: 'teacherAssociate',
                nameforShow: '选择导员'
            }
        ],
        gridHeader: [
            {
                headerName: '级',
                field: 'major.grade'
            },
            {
                headerName: '院系',
                field: 'major.department'
            },
            {
                headerName: '班级',
                field: 'classNumber'
            },
            {
                headerName: '专业',
                field: 'major.majorName'
            },
            {
                headerName: '导员',
                field: 'mentor.name'
            }
        ]
    },
    {
        name: 'student',
        nameForShow: '学生',
        subTab: 'studentInfo',
        subAssociateTab: [
            {
                name: 'classAssociate',
                nameforShow: '选择班级'
            }
        ],
        gridHeader: [
            {
                headerName: '姓名',
                field: 'name'
            },
            {
                headerName: '性别',
                field: 'sex'
            },
            {
                headerName: '身份证号',
                field: 'identityCardNumber'
            },
            {
                headerName: '学号',
                field: 'studentNumber'
            },
            {
                headerName: '状态',
                field: 'studentStatus'
            },
            {
                headerName: '家庭住址',
                field: 'homeAddress'
            },
            {
                headerName: '联系电话',
                field: 'phoneNumber'
            },
            {
                headerName: '宿舍楼号',
                field: 'apartment'
            },
            {
                headerName: '宿舍房间号',
                field: 'chamber'
            },
            {
                headerName: '床位号',
                field: 'bed'
            },
            {
                headerName: '专业',
                field: 'major.majorName'
            },
            {
                headerName: '级',
                field: 'major.grade'
            },
            {
                headerName: '院系',
                field: 'major.department'
            },
            {
                headerName: '班级',
                field: 'class.classNumber'
            }

        ]
    },
    {
        name: 'score',
        nameForShow: '成绩',
        subTab: 'scoreInfo',
        subAssociateTab: [
            {
                name: 'majorAssociate',
                nameforShow: '选择专业'
            },
            {
                name: 'courseAssociate',
                nameforShow: '选择学科'
            }
        ],
        gridHeader: [
            {
                headerName: '姓名',
                field: 'student.name'
            },
            {
                headerName: '学科',
                field: 'course.courseName'
            },
            {
                headerName: '分数',
                field: 'score'
            },
            {
                headerName: '专业',
                field: 'major.majorName'
            },
            {
                headerName: '学年',
                field: 'semester'
            }
        ]
    }
];
