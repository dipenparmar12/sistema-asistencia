// $.getJSON('/getDashboardData', function(data, textStatus, jqXHR) {
//   //- console.log(myApp.flattenObject(data))
//   let students = new Map();
//   console.log(data, students);
//   makePivot('#attendance_dashboard', data);
// });

$.getJSON('/getDashboardData', function(data, textStatus, jqXHR) {
  makePivot('#attendance_dashboard', data);
});

function makePivot(selector, data, uiType = 'pivot') {
  $(selector).pivotUI(data, {
    rows: ['student_id', 'id'],
    cols: ['date'],
    rendererName: 'Table'
    // filter: (record) => {return record.present == 1},
    // derivedAttributes:{
    //   "teacher_id": function(mp) {
    //       return mp["present"] == "1" ? 'PRESENTS' : 'AB';
    //   }
    // }
  });
}
