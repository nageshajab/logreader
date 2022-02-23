// $(document).on("click", "[name='btnDeleteConfig']", function () {
//     console.log('in delete');
//     var result = confirm('Are you sure ?');
//     if (result) {
//         var id = $(this).data('id');
//         // $.post("/config/delete", function (id) {
//         //     console.log(`deleting id ${id}`);
//         // });
//         var data = {
//             id: id
//         };
//         $.ajax({
//             type: "POST",
//             url: "/config/delete",
//             data: JSON.stringify(data),
//             contentType: 'application/json',
//             success: function (res) {
//                 //  console.log(res);
//                alert("deleted");
//             },
//             error: function (xhr, status, err) {
//                 alert(xhr, status, err.toString());
//             }
//         });
//         return;
//         // console.log($(this));        
//         // alert(d);       
//     }
// });