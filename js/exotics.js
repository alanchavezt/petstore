function Exotic(id,name,bodySize,species,dateOfBirth,owner,notes) {
 	this.id = id
	this.name = name
	this.bodySize = bodySize 
	this.species = species  
	this.dateOfBirth = dateOfBirth
	this.owner = owner
	this.notes = notes
}

var exotics = [];
exotics.push(new Exotic(1,"Stitch", "Medium", "Bearded Dragon", "11/11/2010","Alan Chavez", "Good" ))
exotics.push(new Exotic(2,"Zach", "Small", "Sugar Glider", "11/11/2011","Clark Holmes", "Good" ))
exotics.push(new Exotic(3,"Pixie", "Large", "Tarantula", "11/11/2012","Johnny Shepper", "Good" ))
exotics.push(new Exotic(4,"Niana", "Small", "Hissing Cockroach", "11/11/2013","Jayk Mckorther", "Good" ))
exotics.push(new Exotic(5,"Mercedes", "Medium", "Hedgehog", "11/11/2014","Eythan Carter", "Good" ))
exotics.push(new Exotic(6,"Kiefer", "Large", "Burmese Python", "11/11/2015","Paulo Zeballos", "Good" ))
exotics.push(new Exotic(7,"Fuse", "Medium", "Fennec Fox", "11/11/2016","Troy Bradshow", "Good" ))
exotics.push(new Exotic(8,"China", "Small", "Kinkajou", "11/11/2017","Aby Coleman", "Good" ))

renderTable($("#exoticsDataTable"), exotics)

$(document).ready(function() {
	$('th').each(function(col) {
		$(this).hover(
			function() { $(this).addClass('focus'); },
			function() { $(this).removeClass('focus'); }
		);

		$(this).click(function() {
			if ($(this).is('.asc')) {
				$(this).removeClass('asc');
				$(this).addClass('desc selected');
				sortOrder = -1;
			}
			else {
				$(this).addClass('asc selected');
				$(this).removeClass('desc');
				sortOrder = 1;
			}

			$(this).siblings().removeClass('asc selected');
			$(this).siblings().removeClass('desc selected');
			var arrData = $('table').find('tbody >tr:has(td)').get();

			arrData.sort(function(a, b) {
				var val1 = $(a).children('td').eq(col).text().toUpperCase();
				var val2 = $(b).children('td').eq(col).text().toUpperCase();
				if($.isNumeric(val1) && $.isNumeric(val2))
				return sortOrder == 1 ? val1-val2 : val2-val1;
				else
					return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
			});

			$.each(arrData, function(index, row) {
				$('tbody').append(row);
			});
		});
	});

	$("#search").on("keyup", function() {
	    var value = $(this).val();
	    value = value.toUpperCase();

	    $("table tr").each(function(index) {
	        if (index !== 0) {

	            $row = $(this);

	            var text = $row.find("td:eq(2)").text();
	            text = text.toUpperCase();

	            if (text.indexOf(value) !== 0) {
	                $row.hide();
	            }
	            else {
	                $row.show();
	            }
	        }
	    });
	});

});



function renderTable(tableContainer, exotics){

	tableContainer.append(
		"<thead class='thead-dark'>" +
	    "    <tr>" +
	    "        <th scope='col' hidden>ID</th>" +
	    "        <th scope='col'>#</th>" +
	    "        <th scope='col'>Name</i></th>" +
	    "        <th scope='col'>Body Size</th>" +
	    "        <th scope='col'>Species</th>" +
	    "        <th scope='col'>Date of Birth</th>" +
	    "        <th scope='col'>Owner</th>" +
	    "        <th scope='col'>Notes</th>" +
	    "        <th scope='col'>Actions</th>" +
	    "    </tr>" +
	    "</thead>" + 
	    "<tbody>" + 
	    "</tbody>" + 
	    "")

	for (var i = 0; i < exotics.length; i++) {
        var row = $("<tr />")
    	tableContainer.append(row);

    	row.append($("<td hidden='true'>" + exotics[i].id+ "</td>")); 
    	row.append($("<td>" + (i+1)+ "</td>")); 
		row.append($("<td>" + exotics[i].name + "</td>")); 
		row.append($("<td>" + exotics[i].bodySize + "</td>"));
		row.append($("<td>" + exotics[i].species + "</td>"));
		row.append($("<td>" + exotics[i].dateOfBirth + "</td>"));
		row.append($("<td><a href=# data-toggle='modal' data-target='#exoticModal'>" + exotics[i].owner + "</a></td>"));
		row.append($("<td><a href=# data-toggle='modal' data-target='#exoticModal'>" + exotics[i].notes + "</a></td>"));
		row.append($("<td class='text-right'>" + 
			" <label data-toggle='modal' data-target='#myModal' ><i onClick=editRow("+exotics[i].id+") class='fa fa-edit text-success'></i></label>" +
			" <label><i onClick=removeRow("+exotics[i].id+") class='fa fa-trash text-danger'></i></label>" +
			"</td>"));
    }
}