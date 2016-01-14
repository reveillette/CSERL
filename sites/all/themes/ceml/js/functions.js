(function ($) { 
$(document).ready(function() {

	// Change link on logo to direct to UC site
	$("#navbar .logo").attr('href', 'http://universityofcalifornia.edu/');
	
	// Dynamically change width of search box 
	$("#block-search-form input").focusin(function() {
		$(this).css('width', '160px');
		$('ul.menu.nav.navbar-nav:not(.secondary)').css('margin-right', '215px');
	});

	$("#block-search-form input").focusout(function() {
		$(this).css('width', '70px');
		$('ul.menu.nav.navbar-nav:not(.secondary)').css('margin-right', '125px');
	});


	// Teasers

		// Place teaser text
		// Images
		$('.node-teaser img, .node-teaser iframe, .node-teaser video, .node-teaser .google-map-field').on('load',function() {
			$(this).each(function() {
				var height = $(this).height();
				console.log(height);
				// Set position of text elements
				$(this).parents('.node-teaser').find(".field, header").not('.field-type-image, .field-type-media, .field-type-google-map-field, footer .field').css('top', height);
				// Set height of wrapper
				$(this).parents('.node-teaser').css('height', height+200);
			});
		});

		// Change color band of teaser based on content type
		$('.node-teaser').each(function() {			
			if ($(this).hasClass('node-place')) {
				$('.field-type-google-map-field').css('border-bottom-color', '#ff6e1b')
			} else if ($(this).hasClass('node-person')) {
				$('.field-type-image').css('border-bottom-color', '#ffe552')
			} 
		})
		
		
		// Hide "Read More" text
		$('.node-readmore a').text('');
	


	// Find Content	

		// Dynamically show and hide filters
		// For media content		
		if($('#edit-type').val() == "media") {
		    $('.views-widget-filter-field_content_type_value').show(); // show content type filter
		    $('.views-widget-filter-type_1').show(); // show filetype filter
		    $('.views-widget-filter-field_ownership_value').show(); // show ownership filter
		    $('.views-widget-filter-field_faculty_permissions_media_value').show(); // show media permissions filter (faculty)
		    $('.views-widget-filter-field_public_permissions_media_value').show(); // show media permissions filter (public)
		} else if($('#edit-type').val() != "media") {
		    $('.views-widget-filter-field_content_type_value').hide();
		    $('.views-widget-filter-type_1').hide();
		    $('.views-widget-filter-field_ownership_value').hide(); 
		    $('.views-widget-filter-field_faculty_permissions_media_value').hide(); 
		    $('.views-widget-filter-field_public_permissions_media_value').hide(); 
		}

		// For person content
		if($('#edit-type').val() == "person") {
		    $('.views-widget-filter-field_availability_value').show(); // show availability filter
		    $('.views-widget-filter-field_expertise_tid').show(); // show expertise filter

		} else if($('#edit-type').val() != "person") {
			$('.views-widget-filter-field_availability_value').hide(); // hide availability filter
			$('.views-widget-filter-field_expertise_tid').hide(); // hide expertise filter
		}

			


		// Move description before widget
		$('.views-exposed-widget .description').each(function() {
			var desc = $(this);
			var operator = $(this).siblings('.views-operator');
			var widget = $(this).siblings('.views-widget');
			if (!operator.length) {
			// 	$(operator).before(desc);
			// } else {
				$(widget).before(desc);
			}
		});


	// Remove container class from footer and add to region-footer
	$('.footer').removeClass('container');
	$('.region-footer').addClass('container');

	// Append caret to field display in sidebar
	$('.views-exposed-widget label').append("<i class='fa fa-angle-up'></i>"); 

	// Minimize/maximize field display in sidebar
	$('.views-exposed-widget label').click(function() {
		$(this).siblings('.views-widget').slideToggle();
		if ($(this).find('i').hasClass('fa-angle-up')) {
			$(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
		} else if ($(this).find('i').hasClass('fa-angle-down')) {
			$(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
		}
	})





});
})(jQuery);
