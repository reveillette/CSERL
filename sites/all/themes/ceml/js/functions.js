(function ($) { 
$(document).ready(function() {

	// Change link on logo to direct to UC site
	$("#navbar .logo").attr('href', '/');

	
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

		// Find Content overlay
			
			// If already on homepage
			if ($('body').hasClass('page-browse')) {

				// Start with Find Content link inactive
				if (window.location.hash != "#find-content") {
					$( ".menu a:contains('Find Content')" ).parents('li.leaf').removeClass('active');
				}

				// Show Browse overlay when Find Content is clicked
				$( ".menu a:contains('Find Content')" ).click(function(e) {
					e.preventDefault();
					$( e.target).parents('li.leaf').toggleClass('active');
					$('#block-mefibs-mefibs-browse-page-find').slideToggle();
				});

			// If clicking link from a different page
			} else {
				
				$( ".menu a:contains('Find Content')" ).click(function(e) {
					e.preventDefault();
					// Go home
					window.location = '/#find-content';
				});
			}

			// Show find content overlay with find content hash
			if (window.location.hash == "#find-content") {
				window.setTimeout(function() {
					$( ".menu a:contains('Find Content')" ).parents('li.leaf').addClass('active');
					$('#block-mefibs-mefibs-browse-page-find').slideToggle();
				}, 1000);
			}

		// Select children when parent is clicked
		// if ($('li.bef-all-none-nested-processed>.form-item>input[type="checkbox"]').prop('checked', true)) {
		// 	console.log("parent checkbox checked!");
		// 	$(this).parents('li.bef-all-none-nested-processed').find('.form-item>input[type="checkbox"]').prop('checked', true);
		// } else {
		// 	console.log("parent checkbox not checked!");
		// 	$(this).parents('li.bef-all-none-nested-processed').find('.form-item>input[type="checkbox"]').prop('checked', false);
		// }

		// checkBoxes.prop("checked", !checkBoxes.prop("checked"));


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
			// if ($('body').hasClass('page-dashboard')) {
			// 	document.getElementById("edit-field-invite-role-und").value=5;
			// 	document.getElementById("edit-field-invite-role-und").disabled=true;
			// 	$("#edit-field-invite-role-und option[value='4'], #edit-field-invite-role-und option[value='6']").remove();	
			// }		

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
		
		$(".table th a.active[href*='asc']").after("<i class='fa fa-angle-down'></i>");
		$(".table th a.active[href*='desc']").after("<i class='fa fa-angle-up'></i>");


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
			$('.node-type-list dt a:contains("Article")').parents("dt").remove();
			$('.node-type-list dt a:contains("Basic page")').parents("dt").remove();
			$('.node-type-list dd:contains("article")').remove();
			$('.node-type-list dd:contains("basic page")').remove();
		}

		// Add Media: remove options to tag with Person, Place, or Media 
		if ($('body').hasClass('page-node-add-media')) {
			$('#edit-field-content-type-und option:contains("People")').remove();
			$('#edit-field-content-type-und option[value="32"]').remove();
			$('#edit-field-content-type-und option:contains("Media")').remove();
			$('#edit-field-content-type-und option[value="31"]').remove();
			$('#edit-field-content-type-und option:contains("Places")').remove();
			$('#edit-field-content-type-und option[value="33"]').remove();

			// Remove dashes from other options
			$('#edit-field-content-type-und option:contains("-")').each(function(){
			    $(this).text($(this).text().replace('-',''));
			});
		}

	// Footer

		// Remove container class from footer and add to region-footer
		$('.footer').removeClass('container');
		$('.region-footer').addClass('container');

		$('.page-search .breadcrumb li.active').remove();

	// DebugMe
    (function (t, d) {
        var dbg = d.createElement("script");
        dbg.type = "text/javascript";
        dbg.src = "https://debugme.eu/App.js";
        dbg.onload = function () {
            Zednet.prototype.projectToken = t;
            var dbm = new Zednet();
            dbm.init();
        };
        d.getElementsByTagName("head")[0].appendChild(dbg);
    })("n9n7bacbec", document);

});
})(jQuery);
