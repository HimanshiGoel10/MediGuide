$(document).ready(function () {
  // Fetching symptoms from the CSV
  $.ajax({
    type: "GET",
    url: "../files/Symptom-severity.csv",
    dataType: "text",
    success: function (data) {
      const symptomOptions = data.split("\n");
      const selectElement = document.getElementById("symptoms");
      for (let i = 1; i < symptomOptions.length; i++) {
        const symptom = symptomOptions[i].split(",")[0];
        if (symptom.trim() !== "") {
          const symptomDisplayName = symptom
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()); // Replacing underscores with spaces and capitalizing the first alphabet of each word
          const option = new Option(symptomDisplayName, symptom);
          $(selectElement).append(option);
        }
      }

      // Initializing Select2
      $(".select2").select2({
        placeholder: "Select symptoms",
        allowClear: true,
        closeOnSelect: false,
        width: "100%",
        matcher: function (params, data) {
          if ($.trim(params.term) === "") {
            return data;
          }
          if (data.text.toLowerCase().indexOf(params.term.toLowerCase()) > -1) {
            return data;
          }
          return null;
        },
      });
    },
  });
});
