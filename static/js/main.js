// Month First Used Form Field Dynamic Update
// Dependent on the Tax Year Chosen
$(document).ready(function() {
  function updateMonth() {
    $("#id_month_first_used").empty();
    $("#id_month_first_used").append('<option value="">-- Select Month First Used --</option>');
    $("#id_month_amended").empty();
    $("#id_month_amended").append('<option value="">-- Select Month Amended --</option>');

    tax_year_val = $("#id_tax_year").val();

    if (tax_year_val != "") {
      start_date = moment(tax_year_val + "-01");
      end_date = moment({year: start_date.year() + 1, month: 5, day: 1});

      while (start_date <= end_date) {
        console.log(start_date.toString());
        $("#id_month_first_used").append('<option value="' + start_date.format("YYYY-MM") + '">' + start_date.format("MMM YYYY") + '</option>');
        $("#id_month_amended").append('<option value="' + start_date.format("YYYY-MM") + '">' + start_date.format("MMM YYYY") + '</option>');
        start_date = start_date.set('date', 15).add(30, 'days').set('date', 1);
      }
    }
  }

  $("#id_tax_year").change(function() {
    updateMonth();
  });

  // Input Masking
  $(".ein input").inputmask("99-9999999");
  $(".tel input").inputmask("(999) 999-9999");
  $(".date input").inputmask("99/99/9999", { "placeholder": "MM/DD/YYYY" });
  $(".pin input").inputmask("99999");
});
