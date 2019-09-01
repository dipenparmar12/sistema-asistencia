// console.log("javascripts/cutome.js");

myApp = {
	test: () => {
		alert('testing Func')
	},
	student_registration: formdata => {
		console.log(formdata)
	},

	attendance_togle_btn: () => {
		$('.row_present').click(function (e) {
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
		$('#attendance_conform_btn').click(function (e) {
			e.preventDefault()
			$('ul#presents_conform_list_table').empty()
			$('tr.row_present')
				.children('td.stud_name')
				.each(function (index, element) {
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

	delete_student: (self) => {
		console.log(self);
		let student_id = $(self).data('student_id')
		console.log(student_id)

		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.value) {
				$.ajax({
					type: "delete",
					url: "api/students/" + student_id,
					success: (res) => {
						Swal.fire(
							'Deleted!',
							'Your file has been deleted.',
							'success'
						)
					},
					error: (e) => {
						console.log('ERROR', e);
						Swal.fire({
							title: 'Something went wrong.',
							text: 'ERROR',
							type: 'error',
						})
					}
				});

			}
		})


	}
}

myApp.attendance_togle_btn()
myApp.getPresent_student_list()
