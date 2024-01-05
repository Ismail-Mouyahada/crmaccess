export default {
	app: {
		name: "",
		url: "http://localhost:8060",
		frontendUrl: "http://localhost:8050",
		secret: "ea570421651f6199f75765f74ade598a",
		language: "french",
		publicDir: "assets",
	},
	auth: {
		userTokenSecret: "46cb85dA-1ax%W@9dcdfYY6Q!!0-e450d07ea556c2850aca",
		apiTokenSecret: "529fb4c8$Xax%W!91c709B#Q-!07bf33c4cd858c142aab7d",
		jwtDuration: 30, //in minutes
		otpDuration: 5, //in minutes
	},
	database: {
		name:"cotation_master_db",
		type: "mysql",
		host: "localhost",
		username: "root",
		password: "",
		port: "",
		charset: "utf8",
		recordlimit: 10,
		ordertype: "DESC"
	},
	mail: {
		username:"",
		password: "",
		senderemail:"",
		sendername:"",
		host: "",
		secure: true,
		port: ""
	},
	upload: {
		tempDir: "uploads/temp/",
		import_data: {
			filenameType: "timestamp",
			extensions: "json,csv",
			limit: "10",
			maxFileSize: "3",
			returnFullpath: "false",
			filenamePrefix: "",
			uploadDir: "uploads/files/"
		},
		
		profile: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			limit: "1",
			maxFileSize: "3",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

	},
	s3: {
		secretAccessKey: "",
		accessKeyId: "",
		region: "us-west-2",
		bucket: "",
	},
	
}