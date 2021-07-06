$(document).ready(function () {

    var params = GetURLParams();
    var pid = params['pid'];

    $('.summernote').summernote({
        codemirror: {
            theme: 'cerulean'
        },
        placeholder: 'write here...'
    });

    //////////////////////////////////////.Form - Data
    $.getJSON(urlRoot + 'clients/allclients', function (data) {
        for (var i = 0; i < data.length; i++) {
            $('#ProposalToClient').append('<option value=' + data[i].id + '>' + data[i].name + '</option>');
        }
    });
    $.getJSON(urlRoot + 'organisations/?isOwned=True', function (data) {
        for (var i = 0; i < data.length; i++) {
            $('#ProposalFromEntity').append('<option value=' + data[i].id + '>' + data[i].name + '</option>');
        }
    });
    $.getJSON(urlRoot + 'employees/', function (data) {
        for (var i = 0; i < data.length; i++) {
            $('#ProposalToPerson').append('<option value=' + data[i].id + '>' + data[i].name + '</option>');
            // $('#ProposalToPerson').append('<option value=' + data[i].id + '>' + data[i].name + '</option>')
        }
    });
    $(document).on('change','#ProposalToClient',function(){
        var clientId = $(this).val();
        $.getJSON(urlRoot+'contacts/?client='+clientId,function(data){
            for (var i = 0; i < data.length; i++) {
                $('#FromEmployee').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
            }
        }); 
    });

    function addRowCount(tableAttr) {
        $(tableAttr).each(function () {
            $('th:first-child, thead td:first-child', this).each(function () {
                var tag = $(this).prop('tagName');
                $(this).before('<' + tag + '>#</' + tag + '>');
            });
            $('td:first-child', this).each(function (i) {
                $(this).before('<td>' + (i + 1) + '</td>');
            });
        });
    }

    // Call the function with table attr on which you want automatic serial number
    addRowCount('.js-serial');

    if (pid) {
        $.getJSON(urlRoot + 'tasks/proposals/' + pid, function (proposal) {
            $('#ProposalToClient').val(proposal.to_client).trigger('change');
            $('#ProposalToPerson').val(proposal.to_person).trigger('change');
            $('#ProposalFromEntity').val(proposal.from_entity).trigger('change');
            $('#FromEmployee').val(proposal.from_employee).trigger('change');
            var formatted5 = null,
                formatted6 = null;
            if (proposal.proposal_date) {
                var datetime = proposal.proposal_date.split('T');
                formatted5 = $.datepicker.formatDate("dd/mm/yy", new Date(datetime[0]));
                formatted6 = datetime[1].slice(0, -4);
            }
            $('#ProposalDate').val(formatted5);
            $('#ProposalTime').val(formatted6);
            $('#ProposalSubject').val(proposal.subject) //.summernote('code',proposal.subject);
            $('#ProposalBackground').summernote('code', proposal.background);
            $('#ProposalScopeOfWork').summernote('code', proposal.scopeOfWork);
            $('.ProposalFee').val(proposal.fees);
            $('#ProposalStatus').val(proposal.taskProposalStatus).trigger('change');
            $('#ProposalIntroLine').summernote('code', proposal.introductory_line);
            $('#ProposalDeliverables').summernote('code', proposal.deliverables);
            $('#ProposalMilestone').summernote('code', proposal.payment_milestone);
        });
    }

    $(document).on('click', '#taskRevenue', function () {
        $('#FeeProcess').modal('show');
    });

    //Fee Structure
    $(document).on('click', '.addRow', function () {
        $('.rowEntry').append(`
            <div class="row">
                <label class="col-xs-3 col-sm-3 select">
                    <select class="select2 empNameM">
                        <option disabled selected value="">Select ...</option>
                    </select>
                </label>
                <label class="col-xs-3 col-sm-3 label">
                    <span class="empDesignM pos-des"></span>
                </label>
                <label class="col-xs-2 col-sm-2 input">
                    <input class="empDurationM" type="number">
                </label>
                <label class="col-xs-2 col-sm-2 label">
                    <span class="empPerCostM pos-des"></span>
                </label>
                <label class="col-xs-1 col-sm-1 label">
                    <span class="empCostM pos-des"></span>
                </label>
                <label class="col-xs-1 col-sm-1 m-t-10">
                    <i class="glyphicon glyphicon-remove text-danger removeRow"></i>
                </label>
            </div>
        `);
        getEmp(globalEmployee);
    });
    $(document).on('change','.empDurationM',function(){
        updateModal();
    })
    function getEmp(data) {
        for (var i = 0; i < data.length; i++) {
            $('.rowEntry .empNameM:last').append('<option value=' + data[i].id + '>' + data[i].name + '</option>');
        }
        $('.empNameM').select2({
            dropdownParent: $('#FeeProcess'),
            placeholder: {
                id: '-1',
                text: 'Select...'
            },
            allowClear: true
        })
    }

    $.getJSON(urlRoot + 'employees/', function (data) {
        globalEmployee = data;
        getEmp(globalEmployee);
    });

    function updateModal(){
        let margin=$('#marginCost').val()?$('#marginCost').val():0;
        let EmpCost = 0;
        let AdminCost = 0;
        let TotalCost = 0;
        let t=0;
        $('.empPerCostM').map(function(){
            let duration=parseFloat($(this).closest('div').find('.empDurationM').val())?$(this).closest('div').find('.empDurationM').val():0;
            let ecost=parseFloat($(this).html())?$(this).html():0;
            let cost=duration*ecost;
            $(this).closest('div').find('.empCostM').html(cost.toFixed(2));
            EmpCost=EmpCost+cost;
        });
        AdminCost = (EmpCost * 0.25);
        TotalCost = AdminCost + EmpCost;
        var marginCost = TotalCost * 0.30;
        $('#empCost').empty().html(EmpCost.toFixed(2));
        $('#adminCost').empty().html(AdminCost.toFixed(2));
        $('#totalCost').empty().html(TotalCost.toFixed(2));
        t = parseInt(TotalCost) + parseInt(TotalCost)*parseInt(margin)/100;
        $('#totalFee').val(t);
        console.log(TotalCost + ':' + marginCost);
    }

    $(document).on('change', '.empNameM', function () {
        var empid = $(this).val();
        if(empid){
            var ctc_control=$(this).closest('div').find('.empPerCostM');
            empObj = globalEmployee.find(function (data) {
                return data.id == empid
            });
            if(empObj.designation){
                $(this).parentsUntil('.rowEntry').find('.empDesignM').html(empObj.designation);
            }
            if($(this).closest('div').find('.empDurationM').val()=="")
                $(this).closest('div').find('.empDurationM').val(1);
            $.getJSON(urlRoot + 'employees/' + empid, function (employee){
                $(ctc_control).html(employee.ctc_per_hour.toFixed(2));    
                updateModal();
            }).error(function(error){
                console.log(error.responseText);
            });
        }
    });
    

    $(document).on('change', '#marginCost', function () {
        let margin = $(this).val();
        if (margin == '') {
            swal('Please Enter a margin!');
            return false;
        }
        else{
            updateModal();
        }
    });
    $(document).on('focus', '.feeSubmit', function () {
        var tots = $('#totalFee').val();
        if (tots != '') {
            $('.ProposalFee').val(tots);
            $('#FeeProcess').modal('hide');
        } else {
            swal('Add an employee and its duration!');
        }
    });

    $(document).on('click', '.removeRow', function () {
        $(this).parentsUntil('.rowEntry').remove();
        updateModal();
    });

    function checkValidation() {
        var toClient = $('#ProposalToClient').val();
        var toPerson = 1; //$('#ProposalToPerson').val();
        var fromEntity = $('#ProposalFromEntity').val();
        var fromEmployee = $('#FromEmployee').val();
        var date = $('#ProposalDate').val();
        var time = $('#ProposalTime').val();
        var subj = $('#ProposalSubject').val();
        var background = $('#ProposalBackground').val();
        var scopeOfWork = $('#ProposalScopeOfWork').val();
        var fees = $('.ProposalFee').val();

        if (toClient == null) {
            swal('Select a Client to send to');
            $('#ProposalToClient').focus();
            return false;
        }
        if (toPerson == null) {
            swal('Select a person to send to');
            $('#ProposalToPerson').focus();
            return false;
        }
        if (fromEntity == null) {
            swal('Select a person from entity');
            $('#ProposalFromEntity').focus();
            return false;
        }
        if (fromEmployee == null) {
            swal('Select a person from employee');
            $('#FromEmployee').focus();
            return false;
        }
        if (date == '') {
            swal('PLease add a date/time');
            $('#ProposalDate').focus();
            return false;
        }
        if (time == '') {
            swal('PLease add a date/time');
            $('#ProposalTime').focus();
            return false;
        }
        if (subj == '') {
            swal('Please add Subject');
            $('#ProposalSubject').focus();
            return false;
        }
        if (background == '') {
            swal('Please add background');
            $('#ProposalBackground').focus();
            return false;
        }
        if (scopeOfWork == '') {
            swal('Please add scope of work');
            $('#ProposalScopeOfWork').focus();
            return false;
        }
        if (fees == '') {
            swal('Please add fees');
            return false;
        }
        return true;
    }

    $(document).on('click', '#submitProposal', function () {

        var valid = checkValidation();

        if (valid) {
            var toClient = $('#ProposalToClient').val();
            var toPerson = $('#ProposalToPerson').val();
            var fromEntity = $('#ProposalFromEntity').val();
            var fromEmployee = $('#FromEmployee').val();
            var date = $('#ProposalDate').val();
            var time = $('#ProposalTime').val();
            var subj = $('#ProposalSubject').val() //.summernote('code').replace(/&quot;/g,'"').replace(/&nbsp;/g,' ');
            var intro = $('#ProposalIntroLine').summernote('code').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace('', ' ');
            var background = $('#ProposalBackground').summernote('code').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace('', ' ');
            var deliverables = $('#ProposalDeliverables').summernote('code').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace('', ' ');
            var scopeOfWork = $('#ProposalScopeOfWork').summernote('code').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace('', ' ');
            var fees = parseInt($('.ProposalFee').val()).toFixed(2);
            var status = $('#ProposalStatus').val();
            var paymentMilestones = $('#ProposalMilestone').summernote('code').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace('', ' ');
            var ProposalDate = getFormateDateToServer(date) + 'T' + time + ':00Z';

            var ProposalData = new Object();
            ProposalData.to_client = toClient;
            ProposalData.to_person = 1; //toPerson;
            ProposalData.from_entity = fromEntity;
            ProposalData.from_employee = fromEmployee;
            ProposalData.proposal_date = ProposalDate;
            ProposalData.subject = subj;
            ProposalData.introductory_line = intro;
            ProposalData.scopeOfWork = scopeOfWork;
            ProposalData.background = background;
            ProposalData.deliverables = deliverables;
            ProposalData.payment_milestone = paymentMilestones;
            ProposalData.fees = fees;
            ProposalData.taskProposalStatus = status;

            var ProposalJSON = JSON.stringify(ProposalData);
            console.log(ProposalJSON);

            if (!pid) {
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url: urlRoot + 'tasks/proposals/',
                    datatype: 'JSON',
                    method: 'POST',
                    headers: {
                        "X-CSRFToken": csrftoken,
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    processData: false,
                    data: ProposalJSON,
                    success: function () {
                        swal('Proposal Added');
                    },
                    error: function (error) {
                        console.log(error.responseText);
                    }
                });
            } else if (pid) {
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url: urlRoot + 'tasks/proposals/' + pid + '/',
                    datatype: 'JSON',
                    type: 'PUT',
                    headers: {
                        "X-CSRFToken": csrftoken,
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    processData: false,
                    data: ProposalJSON,
                    success: function () {
                        swal('Proposal Updated');
                    },
                    error: function () {
                        console.log(error.responseText);
                    }
                });
            }
        }
    });
});