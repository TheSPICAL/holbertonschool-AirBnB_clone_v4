$(document).ready(function () {
	let checkedAmenities = {};
	$(document).on('change', "input[type='checkbox']", function () {
		if (this.checked) {
			checkedAmenities[$(this).data('id')] = $(this).data('name');
		} else {
			delete checkedAmenities[$(this).data('id')];
		}
		let list = Object.values(checkedAmenities);
		if (list.length > 0) {
			$('div.amenities > h4').text(Object.values(checkedAmenities).join(', '));
		} else {
			$('div.amenities > h4').html('&nbsp;');
		}
	});
	$.get('https://0.0.0.0:5001/api/v1/status', function (data, textStatus) {
		if (textStatus === "success") {
			if (data.status === 'OK') {
				$('#api_status').addClass('available');
			} else {
				$('#api_status').removeClass('available');
			}
		}
	});
	$.ajax({
		type: 'POST',
		url: 'https://0.0.0.0:5001/api/v1/places_search',
		data: '{}',
		contentType: 'application/json',
		dataType: 'json',
		success: function (data) {
			for (let i = 0; i < data.length; i++) {
				let place = data[i];
				$('.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest > 1 ? 's' : '') + '</div><div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms > 1 ? 's' : '') + '</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms > 1 ? 's' : '') + '</div></div><div class="description">' + place.description + '</div></article>');
			}
		}
	});
});
$('button').click(function () {
	$.ajax({
		type: 'POST',
		url: 'https://0.0.0.0.5001/api/v1/places_search',
		data: JSON.stringify({ amenities: Object.keys(checkedAmenities) }),
		contentType: 'application/json',
		dataType: 'json',
		success: function (data) {
			for (let i = 0; i < data.length; i++) {
				let place = data[i];
				$('.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest > 1 ? 's' : '') + '</div><div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms > 1 ? 's' : '') + '</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms > 1 ? 's' : '') + '</div></div><div class="description">' + place.description + '</div></article>');
			}
		}
	});
});
