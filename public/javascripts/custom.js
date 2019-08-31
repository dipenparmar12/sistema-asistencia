// console.log("javascripts/cutome.js");

myfun = {
	test: () => {
		alert('testing Func')
	},

	toggle_attendance_row: () => {
		present_checkbox = $("input[type='checkbox'][name^='presents']")
		absent_checkbox = $("input[type='checkbox'][name^='absents']")

		$.each(present_checkbox, function(i, ele) {
			$(ele).prop('checked', false)
		})
		$.each(absent_checkbox, function(i, ele) {
			$(ele).prop('checked', true)
		})

		$.each($('tbody tr'), function(i, e) {
			$(e).addClass('row_absent')
			$(e).removeClass('row_present')
		})
	},

	show_notification: (msg, type = 'success') => {
		$.notify(
			{
				icon: 'add_alert',
				message: msg,
			},
			{
				type: type, // success| warning| danger|
				timer: 4000,
				placement: {
					from: 'top',
					align: 'right',
				},
			}
		)
	}, ///// show_notification()

	attendance_togle_btn: () => {
		$('.row_present').click(function() {
			$(this).toggleClass('row_present')
			$(this).toggleClass('row_absent')
		})
	}, //// attendance_togle_btn()

	checkbox_handler_for_present_absent_students: () => {
		$('table').click(e => {
			if (e.target === 'INPUT') return
			const tr = e.target.closest('tr')
			let present_checkbox,
				absent_checkbox = false
			if (tr) {
				present_checkbox = tr.querySelector("input[type='checkbox'][name^='presents']")
				absent_checkbox = tr.querySelector("input[type='checkbox'][name^='absents']")

				if (present_checkbox && absent_checkbox) {
					present_checkbox.checked = !present_checkbox.checked
					absent_checkbox.checked = !absent_checkbox.checked
				}
			}
		})
	}, //// checkbox_handler_for_present_absent_students()

	conform_attendance_model_launcher: () => {
		$("[data-target='#attendance_submit_model']").click(function(e) {
			e.preventDefault()
			////.....get all Attendance present_Checkbox list
			checkbox_list = $("[name^='presents']")
			////.... let model empty (confirm student list)
			$('#presents_conform_list_model').empty()
			$.each(checkbox_list, function(i, v) {
				///.... Checkbox is checked (if yes means Present): otherwise Absent
				if ($(this).prop('checked')) {
					student_name = $(this.outerHTML).data('student_name')
					student_id = this.value
					// student_id = '';
					$('#presents_conform_list_model').append(
						'<li class="list-group-item">' + student_id + '  ' + student_name + '</li>'
					)
				}
			})
		})
	}, //// conform_attendance_model_launcher()

	attendance_submit: () => {
		$('form#attendance_submit_form').submit(function(e) {
			e.preventDefault()
			submited_attendance = $(this).serializeArray()
			myfun.make_post_req_submit_attendance(submited_attendance)
			///..... Hide Model When Attendance Submited
			$('#attendance_submit_model').modal('hide')
		})
	}, //// attendance_submit()

	make_post_req_submit_attendance: (submited_attendance = null) => {
		////......make Post Req for attendance Submit/Insert
		$.post('/attendance/submit', submited_attendance)
			.done(res => {
				if (res.status == 'success') {
					myfun.show_notification('Attendance successfuly submited. <b>Thank you</b>')
					myfun.reset_attendance_table()
					console.log(res)
				}
			})
			.fail(() => {
				// myfun.show_notification('Attendance not submited Something went wrong.', 'danger');
			})
	}, //// make_post_req_submit_attendance()

	/////... Reset to Defualt val atten_tbl
	reset_attendance_table: () => {
		present_checkbox = $("input[type='checkbox'][name^='presents']")
		absent_checkbox = $("input[type='checkbox'][name^='absents']")
		$.each(present_checkbox, function(i, ele) {
			$(ele).prop('checked', true)
		})
		$.each(absent_checkbox, function(i, ele) {
			$(ele).prop('checked', false)
		})
		$.each($('tbody tr'), function(i, e) {
			$(e).addClass('row_present')
			$(e).removeClass('row_absent')
		})
	}, /////... reset_attendance_table();
} ////... myfun obj

jsHelper = {
	//////....Flatten javascript objects into a single-depth object
	flattenObject: ob => {
		var toReturn = {}
		for (var i in ob) {
			if (!ob.hasOwnProperty(i)) continue
			if (typeof ob[i] == 'object') {
				var flatObject = jsHelper.flattenObject(ob[i])
				for (var x in flatObject) {
					if (!flatObject.hasOwnProperty(x)) continue
					toReturn[i + '.' + x] = flatObject[x]
				}
			} else {
				toReturn[i] = ob[i]
			}
		}
		return toReturn
	}, ////..... flattenObject()
}

$(document).ready(function() {
	////........ Present/absent Toggle from mouse Click
	myfun.attendance_togle_btn()

	///..........Make present & absent Student list before attendance submited
	myfun.checkbox_handler_for_present_absent_students()

	////.......Attedance confirm student List
	myfun.conform_attendance_model_launcher()

	///..........When Attedance Submited
	myfun.attendance_submit()
})
