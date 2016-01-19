(function ($) { 
$(document).ready(function() {

	// Change link on logo to direct to UC site
	$("#navbar .logo").attr('href', 'http://universityofcalifornia.edu/');
	
	
	// Create account - assign and disable role based on URL
		
		// Assistant
		if ($('body').hasClass('page-user-register-assistant')) {
			document.getElementById("edit-field-role-und").value=5;
			document.getElementById("edit-field-role-und").disabled=true;
			$("#edit-field-role-und option[value='4'],#edit-field-role-und option[value='6']").remove();

		
		// Faculty member
		} else if ($('body').hasClass('page-user-register-faculty')) {
			document.getElementById("edit-field-role-und").value=4;
			document.getElementById("edit-field-role-und").disabled=true;
			$("#edit-field-role-und option[value='5'],#edit-field-role-und option[value='6']").remove();			
		
		// Guest
		} else if ($('body').hasClass('page-user-register')) {
			document.getElementById("edit-field-role-und").value=6;
			document.getElementById("edit-field-role-und").disabled=true;
			$("#edit-field-role-und option[value='4'],#edit-field-role-und option[value='5']").remove();			

		}


	// Sidebars

		// Disable tooltips
		$('.views-exposed-widget [data-toggle=tooltip]').tooltip('disable') 

		// Append caret to field display in sidebar
		$('.views-exposed-widget>label, .block>.block-title').append("<i class='fa fa-angle-up'></i>"); 

		// Minimize/maximize field display in sidebar
		$('.views-exposed-widget>label, .block>.block-title').click(function() {
			$(this).siblings().slideToggle();
			if ($(this).find('i').hasClass('fa-angle-up')) {
				$(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
			} else if ($(this).find('i').hasClass('fa-angle-down')) {
				$(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
			}
		})

		// Invites

			// Remove faculty member and guest options from invite widget on faculty dashboard
			if ($('body').hasClass('page-dashboard')) {
				document.getElementById("edit-field-invite-role-und").value=5;
				document.getElementById("edit-field-invite-role-und").disabled=true;
				$("#edit-field-invite-role-und option[value='4'], #edit-field-invite-role-und option[value='6']").remove();	
			}		

	// Admin dashboard 
		
		if ($('body').hasClass('page-admin-dashboard')) {

			// Minimize content widget and content table on page load
			$('#edit-field-content-type-tid-wrapper>label').siblings().slideUp(); 
			$('.pane-content-admin').toggle();
			
			// Show/hide users widget and users table when content widget label is clicked
			$('#edit-field-content-type-tid-wrapper>label').click(function() {
				$('#edit-rid-wrapper>label').siblings().slideToggle();
				$('.pane-admin-users').toggle();
				$('.pane-content-admin').toggle();
				$('input[type="checkbox"]').prop('checked', false);
			}); 

			// Show/hide content widget and content table when users widget label is clicked
			$('#edit-rid-wrapper>label').click(function() {
				$('#edit-field-content-type-tid-wrapper>label').siblings().slideToggle();
				$('.pane-content-admin').toggle();
				$('.pane-admin-users').toggle();
				$('input[type="checkbox"]').prop('checked', false);
			}); 

		}



	// Dashboards 
		
		// Programatically add up and down arrows to active table headers 
		
		$(".table-bordered th a.active[href*='asc']").after("<i class='fa fa-angle-down'></i>");
		$(".table-bordered th a.active[href*='desc']").after("<i class='fa fa-angle-up'></i>");


	// Teasers

		// Hide "Read More" text
		$('.node-readmore a').text('');

		// Show teaser text on hover
		$('.node-teaser').mouseenter(function() {
			$(this).find('.node-readmore a').fadeTo(200, 0.9);
			$(this).find('header, .field-name-field-home-institution, .field-name-field-title, .field-name-field-organization, .field-name-field-tags').slideToggle(200);
		});

		$('.node-teaser').mouseleave(function() {
			$(this).find('.node-readmore a').fadeTo(200, 0);
			$(this).find('header, .field-name-field-home-institution, .field-name-field-title, .field-name-field-organization, .field-name-field-tags').slideToggle(200);
		});	


	// Find Content	Page

		// Dynamically show and hide filters
		// For media content		
		if($('#edit-type').val() == "media" || $('#edit-type').val() == "" ) {
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


	// Add content page

		// Remove options to create a page or an article 
		if ($('body').hasClass('page-node-add')) {
			$('.node-type-list dd:contains("article")').remove();
			$('.node-type-list dd:contains("basic page")').remove();
		}


	// Footer

		// Remove container class from footer and add to region-footer
		$('.footer').removeClass('container');
		$('.region-footer').addClass('container');

		$('.page-search .breadcrumb li.active').remove();

});
})(jQuery);
