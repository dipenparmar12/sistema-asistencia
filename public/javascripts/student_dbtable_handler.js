
class Student {
  constructor(){
    console.log("Student constructor...")
  }

  delete(student_id=null){
    $.ajax({
      url: '/api/students/'+student_id,
      method: 'DELETE',
      type: 'DELETE',
      contentType: 'application/json',
      success: function(data) {
        myfun.show_notification(data.message,'success');  
          // Remove row from table of clicked Student
          $(`[data-student_id=${student_id}]`).parents("tr").fadeOut("fast");
      },
      error: function(error) {
          console.log(error.responseJSON.message);
          myfun.show_notification(error.responseJSON.error.parent.sqlMessage,'warning');
      }
    });
  }  ////// Detele(id)

  create(student){
    console.log(student);
    let requiest_method = 'POST'
    // if(student.full_name){
    //   console.log("Stud Created:from StudentDB Handler.js");
    // }else{
    //   console.log("Something went wrong :from StudentDB Handler.js");
    // }

    $.ajax({
      url: '/api/students/',
      method:requiest_method,
      data: student,
      success: function(data) {
          // handle success
          myfun.show_notification(data.message,'success');
          console.log(data);
          // top.location.reload();
          $("input,input[type=text],textarea,input[type=email]").val('');
      },
      error: function(error) {
          // handle failure
          console.log(error.responseJSON.error);
          error.responseJSON.error.forEach(e => {
            console.log(e);
            myfun.show_notification(e.message,'danger');  
          }); 
      }
  });

  } ////... create()


  /////.,... Create or Update Student
  ////....... Student Form Validations and Insert Data into Database
  form_validate(){
    $('#student_registration_form').validate({ // initialize the plugin
      rules: {
          'full_name' :  { required: true, },
          'email' :  { required: true, email: true },
          'address' :  { required: true, },
          'mobile' :  { required: true, minlength: 3 },
          'enrollment_no' :  { required: true, },
          'dob' :  { required: false, },
          'roll_no' :  { required: true, },
          'profile_pic' :  { required: false, },
      },
      messages: {
          'full_name': "Please specify student full name",
          'email': {
              required: "We need your email address to contact you",
              email: "Your email address must be in the format of name@domain.com"
          },
      },
      submitHandler: (form) => {}
    });  //////...student_form_validater()

    return $("#student_registration_form").valid();
  } ///.... form_validate()



} ////.... #Student class


////......... Get FileName in registration form when user select image/file
$('#profile_pic').on('change',function(){
  //get the file name
  var fileName = $(this).val();
  //replace the "Choose a file" label
  $(this).next('.custom-file-label').html(fileName)
})






let student = new Student();

$('#student_registration_submit_btn').click(function (e) { 
  e.preventDefault()
  if(student.form_validate()) {
    student.create( $('#student_registration_form').serializeArray() )
  }
});

$('.delete_student_btn').click(function (e) { 
  e.preventDefault()
  student.delete($(this).data('student_id'))
});