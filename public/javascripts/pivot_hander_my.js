let pivotMethods = {
   test:() => { console.log("pivotMethds.test()"); }

  ,format_date: (date) => {
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = date.getFullYear();
      return (yyyy + '-' + mm + '-' + dd);
  }

  ////..... Get Req and Make PIVOT Table
  ,getData_from_url: (url, callback, data = '' ) => { 
    console.log(data,'PivotHander.js');
    $.post( url, data, callback );
  }


  ////..... Modify data and render into Pivot table
  ,parse_dashboard: (jsonObject) => {

    ////..... Data Fetching from API in nested Objects and array that converted to Flatten To only one ROW
    let flattenJSON = $.map( jsonObject.data , function( row ) {
      return jsHelper.flattenObject(row);
    });

    $("#attendance_dashboard").pivot(
      flattenJSON,{
          rows: ['student.full_name','student.id'],
          cols: ['date'],
          rendererName: "Table",
          // filter: (record) => {return record.present == 1}, 
          // derivedAttributes:{
          //   "teacher_id": function(mp) {
          //       return mp["present"] == "1" ? 'PRESENTS' : 'AB';
          //   }
          // }
      }
    );

  } /////... parse_dashboard()

  
  ////..... Modify data and render into Pivot table
  ,parse_dashboardUI: () => {
    $("#attendance_dashboard").empty();
  } /////... parse_dashboard()

  
  /////..... Executed when dateRange Changed ( & Updat Dashboard by new DateRange)
  ,get_attendance_data_by_range: (from, to) => {
    $('#attendance_dashboard').empty();
    dates = { "start_date":from, "end_date":to }
    pivotMethods.getData_from_url('/attendance/get/bydate/', pivotMethods.parse_dashboard, dates);
  }
  
} /////.... pivotMethods Object

$(function(){

  ////... When Dashboard Page Loaded Default selected to last 30 Days of DashBoard
  start_date = pivotMethods.format_date(new Date(new Date().setMonth( new Date().getMonth() - 1 )));
  end_date = pivotMethods.format_date(new Date());
  ////.... Get json data & parse into Dashboard
  pivotMethods.get_attendance_data_by_range(start_date, end_date);


  /////.. .... Date Range handler
  $('input[name="daterange"]').daterangepicker({
    opens: 'left'
    },( start, end, label) => {
      console.log(start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'), 'date_Picked');
      pivotMethods.get_attendance_data_by_range(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
  });

}); /////.... End of fucntion()


