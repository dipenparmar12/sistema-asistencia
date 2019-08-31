// console.log("javascripts/cutome.js");

myApp = {
	test: () => {
		alert('testing Func')
	},
	student_registration: formdata => {
		console.log(formdata)
	},

	attendance_togle_btn: () => {
		$('.row_present').click(function(e) {
			///// Color Of Row ( Green/Red )
			$(this).toggleClass('row_present')
			$(this).toggleClass('row_absent')

			////// Radio btn Toggele
			$(this)
				.children('td#present_absent_handler')
				.children('input.radio_btn[type="radio"]')
				.not(':checked')
				.prop('checked', true)
		})
	}, //// attendance_togle_btn()

	getPresent_student_list: () => {
		$('#attendance_conform_btn').click(function(e) {
			e.preventDefault()
			$('ul#presents_conform_list_table').empty()
			$('tr.row_present')
				.children('td.stud_name')
				.each(function(index, element) {
					// element == this
					const list_item = `<li class="list-group-item"> 
							<span class='mr-4'>${index + 1}</span>  <span>${this.innerHTML}</span>
						</li>`
					$('ul#presents_conform_list_table').append(list_item)
				})
		})
	},

	flattenObject: ob => {
		var toReturn = {}
		for (var i in ob) {
			if (!ob.hasOwnProperty(i)) continue
			if (typeof ob[i] == 'object') {
				var flatObject = myApp.flattenObject(ob[i])
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

myApp.attendance_togle_btn()
myApp.getPresent_student_list()

$.getJSON('/getDashboardData', function(data, textStatus, jqXHR) {
	// console.log(data)
	// console.log(myApp.flattenObject(data))
	$('#attendance_dashboard').pivotUI(data, {
		rows: ['student_id', 'id'],
		cols: ['date'],
		rendererName: 'Table',
		// filter: (record) => {return record.present == 1},
		// derivedAttributes:{
		//   "teacher_id": function(mp) {
		//       return mp["present"] == "1" ? 'PRESENTS' : 'AB';
		//   }
		// }
	})
})
