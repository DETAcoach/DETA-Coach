﻿
/*****************************************************************************
* RCE Coach software is available through a GLPv3 open-source software license.
* Any attribution should include the following:
*   © 2016, Mathematica Policy Research, Inc. The RCE Coach software was developed by 
*   Mathematica Policy Research, Inc. as part of the Rapid Cycle Tech Evaluations project funded 
*   by the U.S. Department of Education’s Office of Educational Technology through 
*   Contract No. ED-OOS-15-C-0053.
*******************************************************************************/

// app/models/evaluation.js
// load the things we need
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var User = require('./user');




//define enums:
var users = ["Select an option", "Students", "Teachers", "Other"];
var mainoutcome = ["Select an option", "Student academic achievement", "Student non-academic achievement", "Teacher performance", "Parental engagement", "Other", "Not sure" ];
var direction = ["Select an option", "Increase", "Decrease"];
var spendresults = ["costs", "saves"];
var yesno = ["Select an option","Yes", "No",""];

var validateChar = function (intext)
{
	//var re = /^$|^[A-Za-z0-9 _.,]{5,35}$/;
		//return re.test(intext);
    return true;
}
var charval = [/^[A-Za-z0-9\s]+$/, "Invalid input. Ony letters, numbers, and basic punctuation are allowed."];

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

totalToolNumber = 11; //for completed status

//02.03 determine your approach
var Basics = mongoose.Schema({
    Basics_Have: { type: String,  default: '' },
    Basics_Tech_Name: { type: String, default: ''  }, // was Plan_Question_A
    Basics_Using: { type: String, default: '' }, // was Prob_Appr_A This is not used.  Replaced by Prob_Appr_Current_or_New
    Basics_Users: { type: String, default: ''}, // Was Prob_Appr_B
	Basics_Users_Other: { type: String, default: ''}, // Was Prob_Appr_B_other	 
    Basics_Outcome: { type: String, default: '', help: 'what you hope to change' }, 
    Basics_Outcome_Other: { type: String, default: '' }, 
    Basics_Outcome_NonAcademic: { type: String, default: '' },  
    created_at: { type: Date, default: Date.now },
    updated_at: Date

});
var ProbAppr = mongoose.Schema({
	Appr_Current_or_New: { type: String, default: '' }, // Replaces Prob_Appr_A but values are different.
    Appr_All_Using: { type: String, default: '' }, // was Prob_Appr_C
	Appr_Diff_Usage: {type: String, default: '' },
    Appr_Can_Group: { type: String, default: '' },
    Appr_How_Choose: { type: String, default: '' }, 
	Appr_Treatment_Group: { type: String, default: '' },
	Appr_Comparison_Group: { type: String, default: '' }, 
    created_at: { type: Date, default: Date.now },
    updated_at: Date

});
//03.01 crafting a research question
var PlanQuestion = mongoose.Schema({
	Has_Outcome_Measure: { type: String, default: '' },
    Outcome_Measure: { type: String, default: '' }, // was Plan_Question_B_2
    Outcome_Direction: { type: String, default: '' }, // was  Plan_Question_B_3
    Intervention_Group_Desc: { type: String, default: '' }, // was  Plan_Question_C
    Comparison_Group_Desc: { type: String, default: '' }, // was Plan_Question_D   
    Measurement_Align: { type: String, default: '' },
    Measurement_Design: { type: String, default: '' },
    Measurement_Validated: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
    updated_at: Date

});
//03.02 plan next steps
var PlanNext = mongoose.Schema({
    Tech_Cost_Saves: { type: String, default: '' }, // was Plan_Next_A_1
    Tech_Amount: { type: Number, default: '' }, // was Plan_Next_A_2
    Tech_Cost_User: { type: String, default: '' }, // was Plan_Next_A_3
    Tech_Cost_Desc: { type: String, default: '' }, // was Plan_Next_A_4
	Measure_Units: { type: String, default: '' }, // was Plan_Next_Units
	Measure_Units_Other: { type: String, default: '' }, // was Plan_Next_Units_Other
    Success_Effect_Size: { type: Number, default: '' }, // was  Plan_Next_B
    Pass_Probability: { type: String, default: '' },// was Plan_Next_C_1
    Fail_Probability: { type: String, default: '' },// was Plan_Next_C_2
    Action_Success: { type: String, default: '' }, // was Plan_Next_D_1
    Action_Fail: { type: String, default: '' },// was Plan_Next_D_2
	Action_NoChange: { type: String, default: '' },
    Action_Inconclusive: { type: String, default: '' }, // Plan_Next_D_3
    created_at: { type: Date, default: Date.now },
    updated_at: Date

});
//03.03 context and usage
var PlanContext = mongoose.Schema({
	Eval_Begin_Date: { type: Date, default: '' }, //was Plan_Context_A_4
	Eval_End_Date: { type: Date, default: '' },  //was Plan_Context_A_4
	Type_Curriculum: { type: String, default: '' },
	Type_Practice: { type: String, default: '' },
	Type_Supplement: { type: String, default: '' },
	Type_Assessment: { type: String, default: '' },
	Type_Professional_Learning: { type: String, default: '' },
	Type_Information_Management: { type: String, default: '' },
    Tech_Purpose: { type: String, default: ''  },
    Tech_Components: { type: String, default: '' },
	Delivered_Individually: { type: String, default: '' },
	Delivered_Small_Group: { type: String, default: '' },
	Delivered_Whole_Class: { type: String, default: '' },
	Delivered_School_Wide: { type: String, default: '' },
	Grades:[{ type: String, default: '' }],
    Expected_Dosage: { type: String, default: '' }, //was Plan_Context_A_3
    Developer_Guidelines: { type: String, default: '' },
	ClassroomType_General: { type: String, default: '' },
	ClassroomType_Inclusion: { type: String, default: '' },
	Outcomes: [{ type: String, default: '' }],
	
	SchoolType_Charter: { type: String, default: '' },
	SchoolType_Private: { type: String, default: '' }, 
	SchoolType_Parochial: { type: String, default: '' }, 
	SchoolType_Public: { type: String, default: '' },
    Total_Students: { type: String, default: 0 },
	Urbanicity_Rural: { type: String, default: '' },
	Urbanicity_Suburban: { type: String, default: '' },
	Urbanicity_Urban: { type: String, default: '' },
	District_State: { type: String, default: '' },
	Race_Asian: { type: Number, default: '' },
	Race_Black: { type: Number, default: '' },
	Race_Native_American: { type: Number, default: '' },
	Race_Pacific_Islander: { type: Number, default: '' },
	Race_White: { type: Number, default: '' },
	Race_Other: { type: Number, default: '' },
    Ethnicity_Hispanic: { type: Number, default: '' },
	Ethnicity_Not_Hispanic: { type: Number, default: '' },
	Gender_Female: { type: Number, default: '' },
	Gender_Male: { type: Number, default: '' },
	FRPL_Free: { type: Number, default: '' },
	FRPL_Reduced: { type: Number, default: '' },
    English_Learners: { type: Number, default: '' },
    IEP: { type: Number, default: '' },
    Other_Notes: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
    updated_at: Date

});
var PrepareRandom = mongoose.Schema({
	Individual_Group: { type: String, default: '' },
	Cluster_Group: { type: String, default: '' },
	Cluster_Group_Other: { type: String, default: '' },

	Check_Sample: { type: String, default: '' },
	
	
	
	Check_OneSet: { type: String, default: '' },
	Check_Numeric: { type: String, default: '' },
	Check_Missing: { type: String, default: '' },
	Check_Min_Max: { type: String, default: '' },
	Check_Miss_Impact: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});
var Prepare = mongoose.Schema({
	
    Check_Outcome: { type: String, default: '' },
	Check_Treatment: { type: String, default: '' },
	Check_Pretest: { type: String, default: '' },
	Check_Background: { type: String, default: '' },
	Check_Usage: { type: String, default: '' },
	Check_OneSet: { type: String, default: '' },
	Check_Numeric: { type: String, default: '' },
	Check_Missing: { type: String, default: '' },
	Check_Min_Max: { type: String, default: '' },
	Check_Miss_Impact: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});

var Milestone = mongoose.Schema({
    Order: { type: Number, default: 0 },
    Milestone_Name: { type: String, default: '' },
    Complete_Date: { type: Date, default: '' },
    Assigned_To: { type: String, default: '' },
    Status: { type: String, default: '' },
    Notes: { type: String, default: '' },
	Hide: { type: String, default: '' }
});

var EvalPlan = mongoose.Schema({
	Evaluation_Why: { type: String, default: '' },
	Milestones: [Milestone],
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});

var Random = mongoose.Schema({

	User_Limit_Exist: { type: String, default: '' },
	intervention_quantity: { type: Number, default: 0 },
	intervention_type: { type: String, default: '' },
	s_unit_id: { type: String, default: '' },
    s_pretest: { type: String, default: '' },
    s_block_id: { type: String, default: '' },
    s_baseline_vars: { type: String, default: '' },  
    Result: { type: String, default: '' },
	DownloadPath: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});

//05.01 matching
var Matching = mongoose.Schema({
	Targeted_Access: { type: String, default: '' },
	Target_Group_Desc: { type: String, default: '' }, 
    s_treat_var: { type: String, default: '' },
    s_match_vars: { type: String, default: '' },
    s_grade_var: { type: String, default: '' },
    n_full: { type: String, default: '' },
    n_full_treat: { type: String, default: '' },
    n_matched: { type: String, default: '' },
    n_matched_treat: { type: String, default: '' },
    Result: { type: String, default: '' },
	DownloadPath: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});
//05.2 get results
var GetResult = mongoose.Schema({
    Result: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});

var ShareResult = new mongoose.Schema({
    challenges_limitations: { type: String, default: '' },
    conclusions_next_steps: { type: String, default: '' },
    baseline_var_relabels: [String],
    control_var_relabels: [String],
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});

//Tools visited array
var toollist = new mongoose.Schema({
    name: String,
    status: String,
    visited_at: Date
});

// define the schema for our evaluation model
var evaluationSchema = mongoose.Schema({
    userid: { type: mongoose.Schema.ObjectId, required: true },
    title: { type: String, required: true },
	trialflag: { type: Boolean, default: false },
    last_step: Number,
    next_path: Number,
    is_completed: Boolean,
    is_current: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
    toolsvisited: [toollist],
    status: String,
	basics: { type: Basics, default: Basics },
    probAppr: { type: ProbAppr, default: ProbAppr },
	planQuestion: { type: PlanQuestion, default: PlanQuestion },
    planNext: {
        type: PlanNext,
        default: PlanNext
    },
    planContext: {
        type: PlanContext,
        default: PlanContext
    },
	prepare: {
        type: Prepare,
        default: Prepare
    },
	prepareRandom: {
        type: PrepareRandom,
        default: PrepareRandom
    },
	evalPlan: {
        type: EvalPlan,
        default: EvalPlan
    },
	random: {
        type: Random,
        default: Random
    },
    matching: {
        type: Matching,
        default: Matching
    },
    getresult: {
        type: GetResult,
        default: GetResult
    },
    shareresult: {
        type: ShareResult,
        default: ShareResult
    },
    stepsclicked: [String],
	last_tool: String,
    flag: { type: String, default: 1 },
    path: { type: String, default: "" },
    published_at: Date,
    author: { type: String, default: "" },
    company: { type: String, default: "" }

});


evaluationSchema.pre('save', function (next) {
 
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    if (this.toolsvisited.length > 0) {

        if (this.toolsvisited[this.toolsvisited.length - 1].status === "completed") {
            this.flag = 0;
   
        }
        var per = this.toolsvisited.filter(function (x) { return x.status.toLowerCase() === "completed" }).length / 14 * 100;
        this.status = parseInt(per);
  
       
        if (this.basics) {
            if (this.basics.Basics_Have.toLowerCase() == "no" || (this.basics.Basics_Outcome && this.basics.Basics_Outcome.toLowerCase()) == "not sure") {
                this.flag = 1;
                this.toolsvisited.filter(function (x) { return x.name.toLowerCase() === "the basics" })[0].status = "started";
            }
        }
        //path determine
        if (this.probAppr) {
            console.log("new or current = " + this.probAppr.Appr_Current_or_New.toLowerCase());
            console.log("diff usage = " + this.probAppr.Appr_Diff_Usage.toLowerCase());
			console.log("how choose = " + this.probAppr.Appr_How_Choose.toLowerCase());
            if (this.probAppr.Appr_Current_or_New.toLowerCase() === "current" &&
                (this.probAppr.Appr_All_Using.toLowerCase() === "no" || this.probAppr.Appr_Diff_Usage.toLowerCase() === "yes")) {
                this.path = "path-matching"; //disable random tools or hide them
            } else if (this.probAppr.Appr_Current_or_New.toLowerCase() === "new" && this.probAppr.Appr_How_Choose.toLowerCase() === "random") {
                this.path = "path-random"; //disable matching tools or hide them
            } else if (this.probAppr.Appr_Current_or_New.toLowerCase() === "new" && this.probAppr.Appr_How_Choose.toLowerCase() === "other") {
                this.path = "path-matching"; //no available yet
            } else this.path = "";
			console.log("path = " + this.path);
        }
		
		// Pre-populate milestones. Moved from get current eval.
		if (this.evalPlan.Milestones.length == 0) {

			for (var i = 0; i < 12; i++) {
				var m = ({
					Order:
					i + 1,
					Milestone_Name:
					'',
					Complete_Date:
					'',
					Assigned_To:
					'',
					Status:
					'',
					Notes:
					'',
					Hide:
					''
				});

				this.evalPlan.Milestones.push(m);
			}
        }
        if (this.toolsvisited.filter(function (x) { return (x.name.toLowerCase() === "share your results" && x.status.toLowerCase() === "completed") }).length===1) {
            this.status = "100";
           if (! this.published_at) this.published_at = currentDate; 
            var doc = this;
            User.findById(this.userid, function (err, user) {
                if (err) {
                    next(err);
          
                } else {
                    next();
                }
            });
        }
        else {
            if (this.status === "100") { this.status = "85";}
            next();
        }
    }
    else {
        next();
    }
});


// create the model for users and expose it to our app

module.exports = mongoose.model('Evaluation', evaluationSchema);