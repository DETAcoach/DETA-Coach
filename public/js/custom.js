
/*****************************************************************************
* RCE Coach software is available through a GLPv3 open-source software license.
* Any attribution should include the following:
*   � 2016, Mathematica Policy Research, Inc. The RCE Coach software was developed by 
*   Mathematica Policy Research, Inc. as part of the Rapid Cycle Tech Evaluations project funded 
*   by the U.S. Department of Education�s Office of Educational Technology through 
*   Contract No. ED-OOS-15-C-0053.
*******************************************************************************/



/*~~~~~~~~~~~~~~~~~~ ALL ~~~~~~~~~~~~~~~~~~*/
$(document).ready(function() {
    /** Load Header **/
    $.get("/header", function(data) {
        $("#header").html(data);
        //$("#breadcrb").show();
    });
    if (typeof (UserAgentInfo) != 'undefined' && !window.addEventListener) {
        UserAgentInfo.strBrowser = 1;
    }
    //$('.datepicker').datepicker({
    //    todayHighlight: true
    //});
    $('[data-toggle=collapse]').click(function() {

        var caret = $(this).find('i');
        caret.toggleClass('fa-caret-right');
        caret.toggleClass('fa-caret-down');
    });


	$('body.peeking row a, body.peeking row input').not("body.peeking div.modal-body row a").click(function (e) {
		e.preventDefault();
		e.stopPropagation();
	    e.stopImmediatePropagation();

	    return false;
	});

	$('body.peeking row a').not("body.peeking div.modal-body row a").each(function () {

        $(this).prop('title', 'Not available in Peek mode.');
		$(this).prop('data-toggle', 'tooltip');
		$(this).addClass('tooltip-gr');
    });
	$('body.peeking row input').each(function () {

        $(this).prop('disabled', true);
    });
	var urlParams = new URLSearchParams(window.location.search);

   
	if (urlParams.has('return')) {
	    var ToolName = "";
		var returnpath = urlParams.get('return');
		$("#returnpath").val(returnpath); 
		switch (returnpath) {
			case "evaluation_plan":
			    ToolName = "Evaluation Plan";
				break;
			case "shareresult":
			    ToolName = "Share Your Results";
				break;
			case "plan_next_steps":
				ToolName = "How You Will Use Results";
				break;
			case "context_and_usage":
				ToolName = "Summarize Context";
				break;
			case "basics":
				ToolName = "The Basics";
				break;
			case "craft_your_research_q":
				ToolName = "Craft Your Research Question";
				break;
			case "randomization":
				ToolName = "Random Assignment";
				break;
			case "prepare_data_random":
				ToolName = "Prepare for Random Assignment";
				break;
			case "prepare_data":
				ToolName = "Prepare Your Data for Analysis";
				break;
			case "matching":
				ToolName = "Matching";
				break;
			default:
				ToolName = "";
		}
		$("button#Complete").hide();
		$("button#Save").html("Save and Return to " + ToolName);
	
	}
	function capitalize(x) {
		return x[0].toUpperCase() + x.substring(1);
	}

    $(".capitalize-one").each(function() {
        var x = $(this).text();
        ;
        $(this).text(capitalize(x));
    });

	

        $(document).on('click', '.tool-view-button', function(e) {
            e.preventDefault();
            $("div.tool-div").removeClass("current");
            var href = $(this).attr("href");
            $(this).parent(".tool-view-btn").parent(".tool-div").addClass("current");

            window.location = href;
	});

		$(".redirect-link").click(function (e) {
            e.preventDefault();
            var returnpath = this.pathname.substr(1) + this.search;
            $("#returnpath").val(returnpath);
            $("#status").val("started");
            $("form").submit();

        });

        $('button#Complete').click(function () {
            $('#status').val('completed');
		});
		$('button#Save').click(function () {
            $('#status').val('started');
		});
         
		/*~~~~~~~~~~~~~~~~ The Basics ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
		$('#Basics_Users').change(function () {

			var value = $(this).val();
			var subject = "users";
			var otherSpecify = $("#Question_Users_Other");
			if (value === "other") otherSpecify.show();
			else otherSpecify.hide();
			if (value.toLowerCase() != "select an option" && value.toLowerCase() != "other") {
				subject = value;
			}
			$(".tech_users").text(subject);

			setBasicsConclusion();
		});
		$('#Basics_Outcome').change(function () {

			var value = $(this).val();

			var otherSpecify = $("#Question_Outcome_Other");
			if (value.toLowerCase() === "other") otherSpecify.show();
			else otherSpecify.hide();

			setBasicsConclusion();
		});
		$('#Basics_Have').change(function () {
			$("#Q_Tech_Name").show();
			$("#Q_Who_Users").show();
			$("#Q_Have_Outcome").show();
			setBasicsConclusion();
		});

		$('#Basics_Tech_Name').change(function () {
			setBasicsConclusion();
		});
		$('#Basics_Using').change(function () {
			setBasicsConclusion();
		});


		




/*~~~~~~~~~~~~~~~~~~ craft_your_research_q.html ~~~~~~~~~~~~~~~~~~*/


        $('#Basics_Outcome').change(function() {
            var value = $(this).val();

            var otherSpecify = $("#Question_Outcome_Other");

            if (value.toLowerCase() === "other") otherSpecify.show();
            else otherSpecify.hide();

            if (value.toLowerCase() !== "other" && value.toLowerCase() !== "select an option") {
                $(".eval-outcome").text(value);
            } else {
                $(".eval-outcome").text("B");
            }
        });

        $("#Basics_Outcome_Other").keyup(function() {
            var value = $(this).val();
            $(".eval-outcome").text(value);
        });

        /* Outcome Measure */
        $('#Outcome_Measure').keyup(function() {
            var value = $(this).val();
            $('.effect-measure').text("as measured by " + value);
        });


        $('#Outcome_Direction').change(function() {
            var value = $(this).val();
            $('.change-direction').text(value);
        });

        $('#Intervention_Group_Desc').keyup(function() {
            var value = $(this).val();
            $('.treatment-group').text(value);
        });

        $('#Comparison_Group_Desc').keyup(function() {
            var value = $(this).val();
            $('.comparison-group').text(value);
        });


		
/*~~~~~~~~~~~~~~~~~~ plan_next_steps.html ~~~~~~~~~~~~~~~~~~*/
        $('#Measure_Units').change(function() {
            var value = $(this).val();

            var otherSpecify = $("#Question_Units_Other");

            if (value.toLowerCase() === "other") otherSpecify.show();
            else otherSpecify.hide();

            var munits = $("#Measure_Units").val();
            if (munits.toLowerCase === "other") {
                munits = $("#Measure_Units_Other").val();
            }
            if (munits === "" || munits.toLowerCase() === "select an option") {
                munits = "units";
            }
            $(".measure-units").text(munits);

        });

        $("#Measure_Units_Other").keyup(function() {
            var value = $(this).val();
            $(".measure-units").text(value);
        });

        $('#Success_Effect_Size').change(function() {
            var value = $(this).val();
            $('.success-effect-size').text(value);
        });

        $('#Pass_Probability').change(function() {
            var value = $(this).val();
            $('.prob-success').text(value);
        });

        $('#Fail_Probability').change(function() {
            var value = $(this).val();
            $('.prob-failure').text(value);
        });

 /*~~~~~~~~~~~~~~~~~~ evaluation_plan.html ~~~~~~~~~~~~~~~~~~*/
        $("input[type=checkbox]:checked.hide-row").each(function () {
			$(this).parent("label").parent("td").parent("tr").addClass("hide-row");
			;
		});
			$("input[type=checkbox].hide-row").change(function () {
				if (this.checked) {
				    var thisrow = $(this).parent("label").parent("td").parent("tr");
					thisrow.addClass("hide-row").fadeOut();
					thisrow.appendTo('#timeline');
				    var i = 1;
					$('td.index input').each(function (i) {
						$(this).val(i + 1);
					});
					
				} else {
			        $(this).parent("label").parent("td").parent("tr").removeClass("hide-row");}
			});

			$("#Unhide-row").click(function () {
			    $("input[type=checkbox].hide-row").each(function() {
					$(this).attr('checked', false);
			    });
			    $("tr.hide-row").each(function() {
					$(this).removeClass("hide-row").fadeIn();

			    });
			});


			


            $('[data-toggle="tooltip"]').tooltip();

            //this piece of code is the solution for getting rid of �Object doesn't support this property or method� error in IE11, so the datepicker will work


   }); //<-end document.ready

function setFeedbackOptions(email, page) {
	var fm_options = {
		bootstrap: true,
		position: "right-top",
		name_placeholder: "Name please",
		name_required: true,
		title_label: "",
		message_label: "Message",
		message_placeholder: "Please send us your feedback on the site&rsquo;s functionality and appearance",
		feedback_url: "/feedback",
		custom_params: {
			user_email: email,
			page: page
		},
        delayed_options: {
			success_color: "#5cb85c",
			fail_color: "#d2322d",
			delay_success_milliseconds: 3500,
			send_success: "Thanks for your feedback."
		}
	}
    return fm_options;
};

function setWizardNav(step, stepvisited) {
    step = parseInt(step);

	$("li.wizard-item").each(function (index) {

		if (index === step - 2) {
			$(this).addClass("active");
		}
		if (index === step - 1) {
			$("#Next-link").html($(this).children("p").text() + " <span class='fa fa-chevron-right fa-2x'></span> ");
		}
		if (index === step - 3) {
			$("#Prev-link").html("<span class='fa fa-chevron-left fa-2x'></span> " + $(this).children("p").text());
		}
		if (stepvisited.indexOf(index + 2) > -1) { $(this).addClass("previous"); }
	});

	if (step === 6) {
		$('.bottom-next').hide();
	} else {
		$('.bottom-next').show();
	}
	if (step === 2) {
		$('.bottom-prev').hide();
	} else {
		$('.bottom-prev').show();
	}
}
function recordViewPDF(name, step, path) {

    $.ajax({
        type: "POST",
        url: "/pdf_view",
        data: JSON.stringify({
            "tname": name,
            "step": step
        }),

        dataType: "json",
        contentType: "application/json",
      
    });
    setTimeout('', 10000);
    window.open(path, '_blank', 'fullscreen=yes');

};

/*~~~~~~~~~~~~~~~~~~ randomization.html ~~~~~~~~~~~~~~~~~~*/
$('#Individual_Group').change(function () {
	var value = $(this).val();
	var cluster = $('#Cluster_Group').val("Select an option");

	var clusterSpecify = $("#Question_Cluster");

	if (value.toLowerCase().indexOf("group") !== -1) clusterSpecify.show();
	else clusterSpecify.hide();
	
	var assign = value;

	if (assign  === "select an option") {
		assign = "individuals or groups";
	}
	


	setUserLimitsSelections();
	

});

$('#Cluster_Group').change(function() {
    var value = $(this).val();

    var otherSpecify = $("#Question_Cluster_Other");

    if (value.toLowerCase() === "other" ) otherSpecify.show();
    else otherSpecify.hide();

	var assign = value;
	

    setUserLimitsSelections();

});

$('#User_Limit_Exist').change(function () {
    var value = $(this).val();

    var specifyLimits = $("#Question_User_Limits");

    if (value.toLowerCase() === "yes") specifyLimits.show();
    else {
        $("#intervention_quantity").val("");
        $("#intervention_type").val("Select an option");

        specifyLimits.hide();
    }

    setUserLimitsSelections();

});


function setUserLimitsSelections() {

	var users = $('#Basics_Users').val();

	var gORi = $('#Individual_Group').val();
    var cluster = $('#Cluster_Group').val();
    var scluster = '';
	
    if (cluster === 'classes') {
        scluster = 'class';
    }
	else if (cluster === 'other') {
	    scluster = 'groups';
	}else scluster = cluster.substr(0, cluster.length - 1);

	var ocluster = $('#Cluster_Group_Other').val();
    var datanote = "";
	var pretestnote = "";
	var assignlevel = users;
    var assign = users;
    var compile = " all " + users + " who could potentially use the technology. Your list or dataset will need to include a unique and anonymous id for each one of your " + users;
	if (gORi === "groups") {
		$('#Question_Cluster').show();
		compile = " all " + users + " who could potentially use the technology or a list of all " + cluster + ". If your list or dataset will be at the individual level, it must include a unique and anonymous id for each one of your " + users + " and a " + scluster + " indicator. If your data set will be at the " + scluster + " level, then it just needs a " + scluster + " indicator";
		assign = "groups of " + users;
		assignlevel = users + " by " + scluster;
	    datanote = "You indicated you will randomly assign " + users + " by "
			+ scluster + ".  Your data set can be at the individual or group level. If at the group level, A " + scluster + "'s background characteristic value should be the average value for all " + users + " in the " + scluster + ".";
		pretestnote = "You indicated you will randomly assign " + users + " by "
			+ scluster + ".  Your data set can be at the individual or group level. If at the group level, A " + scluster + "'s pretest value should be the average value for all " + users + " in the " + scluster + ".";
	}
	if (cluster.toLowerCase() !== "select an option") {
		assign = cluster;
	}
	if (cluster.toLowerCase() === "other") {
		$('#Question_Cluster_Other').show();

	}
    if (cluster.toLowerCase() === "other" && ocluster !== '') {
        assign = ocluster;
    }
	
	
    $(".indivs-or-groups").text(assign);
    $(".assign-level").text(assignlevel);
	$(".compile").text(compile);
	$(".tech_users").text(users);
	$(".group-data-prep-note").text(datanote);
	$(".group-pretest-prep-note").text(pretestnote);

	

    $(".indiv-or-group").text("one of your " + assign);

	$("select#intervention_type").empty();

	$("#intervention_type")
		.append($("<option></option>")
			.attr("value", "Select an option")
			.text("Select an option"));
	$("#intervention_type")
		.append($("<option></option>")
			.attr("value", "percentage")
			.text("percent of " + assign));
	$("#intervention_type")
		.append($("<option></option>")
			.attr("value", "number")
			.text(assign));

}
  /*~~~~~~~~~~~~~~~~~~ randomization.html ~~~~~~~~~~~~~~~~~~*/
$('#Targeted_Access').change(function () {
    var value = $(this).val();

    var specifyTarget = $("#Question_Targeted_Desc");

    if (value.toLowerCase() === "yes") specifyTarget.show();
    else specifyTarget.hide();


});

function setBasicsConclusion() {
	var haveTech = $('#Basics_Have').val();
	var techName = $('#Basics_Tech_Name').val();
	var whoUsers = $('#Basics_Users').val();
	if (whoUsers.toLowerCase === "other") whoUsers = $('#Basics_Users_Other').val();
	var haveOutcome = $('#Basics_Outcome').val();
	if (haveOutcome.toLowerCase === "other") haveOutcome = $('#Basics_Outcome_Other').val();


	if (haveTech.toLowerCase() === "no") {

		$("#Q_Tech_Name").hide();
		$("#Q_Who_Users").hide();
		$("#Q_Have_Outcome").hide();
		$("#Step_Conclusion").show();
		$("#stop-no-tech").show();
		$("#stop-no-outcome").hide();
		$("#success").hide();
		$("button.complete").attr("disabled", "disabled");

	}
	else if (haveOutcome.toLowerCase() === "not sure") {
		$("#Step_Conclusion").show();
		$("#stop-no-outcome").show();
		$("#stop-no-tech").hide();
		$("#success").hide();
		$("button.complete").attr("disabled", "disabled");
	}
	else if (techName !== "" && whoUsers.toLowerCase !== "select an option" && haveTech.toLowerCase() !== "no" && haveOutcome.toLowerCase() !== "not sure" && haveOutcome.toLowerCase() !== "select an option") {
		$("#Step_Conclusion").show();
		$("#success").show();
		$("#stop-no-tech").hide();
		$("#stop-no-outcome").hide();
		$("button.complete").removeAttr("disabled");
	}
	else {
		$("#Q_Tech_Name").show();
		$("#Q_Who_Users").show();
		$("#Q_Have_Outcome").show();
		$("#Step_Conclusion").hide();
		$("#stop-no-tech").hide();
		$("#stop-no-outcome").hide();
		$("#success").hide();
		$("button.complete").attr("disabled", "disabled");
	}
}






