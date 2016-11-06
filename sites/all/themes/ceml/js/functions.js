// DebugMe (bug tracker plugin while site is in beta)
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


// Site functions 
(function ($) {  // NOTE: all $(document).ready functions must be written this way for jQuery to work on a Drupal installation!!
	$(document).ready(function() {

		// Begin functions that perform outside ajax complete

			// Change link on logo to direct to UC site
			$("#navbar .logo").attr('href', '/');

			// Add "bubble" to Explore text on homepage to non-logged-in users
			var explore = $(".front.not-logged-in .breadcrumb li:contains('Explore')");
			explore.attr('data-toggle', 'tooltip');
			explore.attr('title', 'To explore CSERL, create an account or sign in above');
			explore.attr('data-placement', 'right');

			explore.tooltip();
			explore.on({
				mouseenter: function() { $(explore).tooltip('show') },
				mouseleave: function() { $(explore).tooltip('hide') }
			});

			// Show "Find Content" dropdown overlay when url has "find-content" hash
			if (window.location.hash == "#find-content") {
				window.setTimeout(function() {
					$( ".menu a:contains('Find Content')" ).parents('li.leaf').addClass('active');
					$('#block-mefibs-mefibs-find-content-page-find').slideToggle();
				}, 1000);
			}

			// Reset "Find Content" panel checkboxes on page load
			if ($('body').hasClass('page-find-content')) {
				resetForm("#views-exposed-form-find-content-page", true);			
	 		}

	 		// Reset Library checkboxes on page load 
	 		if ($('body').hasClass('page-dashboard')) {
	 			resetForm("#views-exposed-form-my-stuff-page", true);
	 		}

	 		// Reorder file type checkboxes to reflect desired filetype order
			var ftlistcont = $(".views-widget-filter-type .bef-checkboxes");

			var image = $(".views-widget-filter-type .form-item-edit-type-image");
			var audio = $(".views-widget-filter-type .form-item-edit-type-audio");
			var video = $(".views-widget-filter-type .form-item-edit-type-video");
			var pres = $(".views-widget-filter-type .form-item-edit-type-presentation");
			var spreadsheet = $(".views-widget-filter-type .form-item-edit-type-spreadsheet");
			var text = $(".views-widget-filter-type .form-item-edit-type-text-document");
			var pdf = $(".views-widget-filter-type .form-item-edit-type-pdf");
			var website = $(".views-widget-filter-type .form-item-edit-type-website");
			var other = $(".views-widget-filter-type .form-item-edit-type-other");

			var newItems = [image, audio, video, pres, spreadsheet, text, pdf, website, other]; // new order
			reorderList(ftlistcont, newItems);

			// Append "Media" to media teaser type
			$('.node-teaser.node-media .field-name-field-content-type a').each(function(i) {
				var subType = $(this).text();
				var fullType = "Media: " + subType;
				$(this).text(fullType);
			});

			// Minimize widgets on page load
		
				// Admin Dashboard
				if ($('body').hasClass('page-admin-dashboard') || $('body').hasClass('page-admin') || $("body").hasClass('page-admin-users') || $("body").hasClass('page-admin-content') || $("body").hasClass('page-user')) {
					var initialLibrary = $('label[for="edit-content"]').siblings().add('#edit-content-wrapper+#edit-secondary-wrapper');
					toggleWidget(initialLibrary, function() {

						// Set initial arrow direction
						$('label[for="edit-content"] .arrow').removeClass('fa-angle-up').addClass('fa-angle-down');

						// Set initial visibility
						setVisibility($("#edit-users-wrapper .views-widget"), $('.pane-admin-users'));
						setVisibility($("#edit-content-wrapper .views-widget"), $('.pane-content-admin'));

					});

				}

				// Sidebars
				if ($('.region-sidebar-first').length > 0 && !$('body').hasClass('page-node')) {
					var initialHidden = $('.block-title').siblings();
					toggleWidget(initialHidden);
				}

		// End functions that perform outside ajax complete
		
		// Begin functions that perform on page refresh AND ajax complete
		f.init();

	});

	// Perform function set on ajax complete
    $(document).ajaxComplete(function(e) {
	    e.stopPropagation();
	    f.init();
	});

    // Functions that perform on page refresh AND ajax complete
	var f = (function() {

	    var obj = {};
	    obj.init = function () {		

			// Sitewide interface

				// Menu area
					
					// Assign active class to active menu tabs
					if ($("body").hasClass('page-admin-dashboard') || $("body").hasClass('page-admin') || $("body").hasClass('page-admin-users') || $("body").hasClass('page-admin-content') || $("body").hasClass('page-user-edit') || $("body").hasClass('page-user')) {
						$(".menu a:contains('Admin Dashboard')" ).addClass('active');
						$(".menu a:contains('Admin Dashboard')" ).parents('li.leaf').addClass('active');
					} else if ($("body").hasClass('page-user')) {
						if ($(".menu a:contains('Admin Dashboard')").length > 0) {
							$(".menu a:contains('Admin Dashboard')" ).addClass('active');
							$(".menu a:contains('Admin Dashboard')" ).parents('li.leaf').addClass('active');
						} else if ($(".menu a:contains('Dashboard')").length > 0) {
							$(".menu a:contains('Dashboard')" ).addClass('active');
							$(".menu a:contains('Dashboard')" ).parents('li.leaf').addClass('active');
						}
					}

				// Content area

					// Add top margin to content when breadcrumb is not present
					if ($('.main-container ol.breadcrumb').length == 0) {
						$('.page-header').css({
							"display": "block",
							"margin-top": "170px"
						});
						// $('.region-content').css('margin-top', '170px');
					}

				// Sidebar areas

					// Move descriptions before widget in sidebars
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

					// Hide sort by, sort order, and submit button widgets
					$('.region-header, .region-sidebar-first').find('.views-widget-sort-by, .views-widget-sort-order, .views-submit-button').hide();

					// Select child checkboxes when parent checkbox is clicked
					$('input[type="checkbox"]').change(function(e) {
						if ($(e.target).parent('.form-item').parent('li').find('ul.bef-tree-child').length > 0) {
							if ($(e.target).prop('checked') == true) {
								//check child checkboxes
								$(e.target).parent('.form-item').siblings('ul').find('input[type="checkbox"]').prop('checked', true);
							} else if ($(e.target).prop('checked') == false) {
								// uncheck child checkboxes
								$(e.target).parent('.form-item').siblings('ul').find('input[type="checkbox"]').prop('checked', false);
							}
						}
					});

					// Only show Filetype filter when Media content type is checked
					var parent = $('.views-widget-filter-tid').find("label:contains('Media')").siblings("input[type='checkbox']");				
					var mediaCheckboxes = findChildCheckboxes(parent).add(parent);

					mediaCheckboxes.change(function(e) {

						if ($(e.target).prop('checked') == true) {

							if(!$("#edit-type-wrapper").is(":visible")) {
								$('#edit-type-wrapper').slideDown();
							} 

						} else if (mediaCheckboxes.prop('checked') == false) {
							$('#edit-type-wrapper input[type="checkbox"]').prop('checked', false);
							$('#edit-type-wrapper').slideUp();
						}
					});

					// Disable tooltips in widgets
					$('.views-exposed-widget [data-toggle=tooltip]').tooltip('disable') 

					var filterLabels = $('.views-exposed-widget>label, .block>.block-title');
					filterLabels.each(function(i) {
						
						// Trim spaces from text
						var text = $(this).text();
						$(this).text(text.trim());

						// Append caret to widget label in sidebar
						if ($(this).find('.fa-angle-up').length == 0) {
							$(this).append("<i class='fa fa-angle-up arrow'></i>"); 
						}

						// Append help icon to widget label if widget has a description
						if ($(this).parents('.views-exposed-widget').find('.description').length != 0) {
							$(this).append("<i class='fa fa-question-circle help-icon' data-clicked=false></i>"); 
						}

					});

					// Show/hide widget descriptions on mouseenter/mouseleave 
					$(".help-icon").off('click').on({
						mouseenter: function() {
							if ($(this).data('clicked') == false) {							
								$(this).parents('.views-exposed-widget').find('.description').filter(':not(:animated)').slideDown();
							}
						},
						mouseleave: function() {
							if ($(this).data('clicked') == false) {
								$(this).parents('.views-exposed-widget').find('.description').filter(':not(:animated)').fadeOut();	
							}
						},
						click: function() {
							var clicked = $(this).data('clicked');

							if (clicked == false) {
								$(this).data('clicked', true);
								$(this).parents('.views-exposed-widget').find('.description').show();							
							} else {
								$(this).data('clicked', false);
								$(this).parents('.views-exposed-widget').find('.description').hide();							
							}
						}
					});

					$(".description").off('click').click(function() {
						$(this).hide();
					});
					
					// Minimize/maximize field display 
					$('.region-sidebar-first, .region-header').off('click').on('click', '.views-exposed-widget>label, .block>.block-title', function(e) {
						var secondaryWidget = $(this).parents('.views-exposed-widget').siblings('.views-widget-filter-secondary');
						toggleWidget($(this).siblings().add(secondaryWidget));
					});
					
				// Teasers (teaser content display mode)

					// Limit tags in teaser footer to 3
					$(".node-teaser").each(function() {
						$(this).find("footer .field-type-taxonomy-term-reference .field-item a").each(function(i) {
							if (i == 2) {
								var nodeLink = $(this).parents('footer').find('.node-readmore a').attr('href');
								$(this).after("<div class='field-item odd'>, <a href='" + nodeLink + "'>More</a>");
							} else if (i > 2) {
								$(this).parents('.field-item').remove();
							} else {
							}
						});
					});

					// Hide "Read More" text in teasers
					$('.node-readmore a').text('');

					// Remove video controls in teasers
					// $('.node-teaser video').removeAttr('controls');
					
					// Horizontally center videos in teaser container 
					centerChildInParent($('.field-type-media .file-video-oembed iframe'), $('.field-type-media'));
					
					// Scale YouTube videos so title and extraneous graphics are hidden
					$('.node-teaser .field-type-media .file-video-oembed iframe').css('transform','scale(1.6)');

					// // Make sure videos loop
					// $('.node-teaser video').attr('loop', true);

					// Move teaser text into a container div
					$('.node-teaser').each(function(i) {
						var container = $(this).prepend("<div class='teaser-text'><div class='temp'></div></div>");
						var teaserText = $(this).children().not('.field-name-field-profile-image').not('.field-name-field-media').not('.field-name-field-map').not('.field-type-taxonomy-term-reference').not('footer');

					});

					// Show teaser text on hover, autoplay video on hover
					$('.node-teaser').mouseenter(function() {
						$(this).find('.node-readmore a').filter(':not(:animated)').fadeTo(200, 0.9);
						$(this).find('.node-readmore a').css('background-color', "#e44c9a");
						$(this).find('.node-readmore a').css('mix-blend-mode', "normal");
						$(this).find('header, .field-name-field-home-institution, .field-name-field-title, .field-name-field-organization, .field-name-field-tags').slideToggle(200);
					    var video = $(this).find('video');
					    if (video.length > 0) {
					    	video[0].play(); 
					    }
					});

					$('.node-teaser').mouseleave(function() {
						$(this).find('.node-readmore a').filter(':not(:animated)').fadeTo(200, 0.6);
						$(this).find('.node-readmore a').css('background-color', "#1295d8");
						$(this).find('.node-readmore a').css('mix-blend-mode', "overlay");
						// $(this).find('.node-readmore a').fadeTo(200, 1);
						// $(this).find('.node-readmore a').css('background-color', "#1295d8");
						// $(this).find('.node-readmore a').css('mix-blend-mode', "multiply");
						$(this).find('header, .field-name-field-home-institution, .field-name-field-title, .field-name-field-organization, .field-name-field-tags').slideToggle(200);
						var video = $(this).find('video');
					    if (video.length > 0) {
					    	video[0].pause(); 
					    }		
					});			

				// Forms
				
					// Change collapsible fieldsets to open
					$('#edit-timezone--3, #edit-privatemsg--2, #edit-field-map-und-0').removeClass('collapsible');

					// Change wording of Add Another Item button
					$('.field-add-more-submit').text("Add Item");

					// Turn cancel links into buttons
					$('#edit-cancel').addClass('btn btn-secondary');

				// Tables 
					
					// Programatically add up and down arrows to active table headers for each table on the page
					var tables = $(".table");
					tables.each(function(i) {
						var tableHeaderAsc = $(this).find("th.active a.active[href*='asc']");
						var tableHeaderDesc = $(this).find("th.active a.active[href*='desc']");

						appendSortArrow(tableHeaderAsc,tableHeaderDesc);
					});

				// Footer

					// Remove container class from footer and add to region-footer
					$('.footer').removeClass('container');
					$('.region-footer').addClass('container');

					$('.page-search .breadcrumb li.active').remove();



			// SEARCH & FIND CONTENT LAYOUTS

				// Search box in primary menu

					function searchInit() {

						// Right-align text in search box
						$("#edit-search-block-form--2").off('focusin').focusin(function() {
							$(this).css('direction','ltr');
						});

						$("#edit-search-block-form--2").off('focusout').focusout(function() {
							$(this).css('direction','rtl');
						});

						// Search box grows on focus text
						// $("#edit-search-block-form--2").off('focusin').focusin(function() {
						// 	$("#block-search-form").animate({
						// 		width: "+=100"
						// 	}, 200);
						// 	$("#navbar .navbar-nav:not(.secondary)").animate({
						// 		right: "+=100"
						// 	}, 200);
						// });

						// $("#edit-search-block-form--2").off('focusout').focusout(function() {
						// 	$("#block-search-form").animate({
						// 		width: "-=100"
						// 	}, 200);
						// 	$("#navbar .navbar-nav:not(.secondary)").animate({
						// 		right: "-=100"
						// 	}, 200);					
						// });
					}
					
					searchInit();

				// Find Content dropdown overlay	
				if ($('body').hasClass('page-find-content')) {  // only perform on Find Content page

					// If already on homepage
					if ($('body').hasClass('page-find-content')) {

						// Initial appearance of Find Content menu item
						if ( $('#block-mefibs-mefibs-find-content-page-find').css('display') == 'none' ) {
							$( ".menu a:contains('Find Content')" ).parents('li.leaf').removeClass('active');
						} else {
							$( ".menu a:contains('Find Content')" ).parents('li.leaf').addClass('active');
						}

						// Show Find Content overlay when Find Content link is clicked
						$( ".menu a:contains('Find Content')" ).off('click').click(function(e) {
							e.preventDefault();
							$('#block-mefibs-mefibs-find-content-page-find').slideToggle();
							$(".menu a:contains('Find Content')").parents('li.leaf').toggleClass('active');
						});

					// If clicking link from a different page
					} else {
						$( ".menu a:contains('Find Content')" ).off('click').click(function(e) {
							e.preventDefault();
							// Go home
							window.location = '/#find-content';
						});
					}

					// Set top position of Find Content overlay
			
						// Get height of header + navbar
						var carouselHeight = $("#carousel-bootstrap").height();
						var topPos = carouselHeight * -1 + "px";
						console.log(topPos);
						$("#block-mefibs-mefibs-find-content-page-find").css('top', topPos);

					// Make sure height of Find Content overlay equals height of main container
					responsiveDiv($('#block-mefibs-mefibs-find-content-page-find'), $('.main-container'), 0, true, false);
					$(window).resize(function() {
						responsiveDiv($('#block-mefibs-mefibs-find-content-page-find'), $('.main-container'), 0, true, false);
					})

				}


			// SIGN IN / CREATE ACCOUNT LAYOUTS
				
				// Disable role field
				$('#edit-field-user-role-und').prop('disabled','disabled');

				// Change sign in button class to btn-primary
				$("#user-login .form-actions button").removeClass('btn-default').addClass('btn-primary');

				// Set value of Role field based on url parameter
				var role = getParameter("role");
				
				if (role == "faculty") {
					$('#edit-field-user-role-und option[value="5"]').remove();
					$('#edit-field-user-role-und option[value="7"]').remove();
					$('#edit-field-user-role-und').val(4);
				} else if (role == "assistant") {
					$('#edit-field-user-role-und option[value="4"]').remove();
					$('#edit-field-user-role-und option[value="7"]').remove();					
					$('#edit-field-user-role-und').val(5);
				} else if (role == "admin") {
					$('#edit-field-user-role-und option[value="4"]').remove();
					$('#edit-field-user-role-und option[value="5"]').remove();					
					$('#edit-field-user-role-und').val(7);
				}

				// Show/hide "reset password" link on click
				$('.reset-password a').off('click').click(function(e) {
					$('.pane-user-password-form').slideToggle(400, function() {

						var isVisible = $('.pane-user-password-form').is(":visible");

						if (isVisible == true) {
							$('.reset-password a').text('Hide password reset'); 
						} else {
							$('.reset-password a').text('Reset password'); 
						}
					});
				})

				// Checking "Do not contact me" deselects other options
				if ($('body').hasClass('page-user-edit')) {  // only perform on user edit pages
					var noContact = $("input[type='checkbox'][value='Do not contact me']");
					var others = $("#edit-field-availability-und--2").find("input[type='checkbox']").not(noContact);

					noContact.change(function(e) {
						if (noContact.prop('checked') == true) {
							others.prop('disabled', true);
							others.parents(".control-label").addClass('disabled');
						} else {
							others.prop('disabled', false);
							others.parents(".control-label").removeClass('disabled');
						}
					})
				}					
				

			// ADMIN DASHBOARD LAYOUT
				
				if ($('body').hasClass('page-admin-dashboard') || $('body').hasClass('page-admin') || $("body").hasClass('page-admin-users') || $("body").hasClass('page-admin-content')) {  // only perform on admin dashboard pages

					// Show/hide users widget and users table when content widget label is clicked
					$('.region-sidebar-first').on('click', '.views-exposed-widget>label', function(e) {
						var toggle;

						if($(e.target).attr('for') == 'edit-content') {
							toggle = $('#edit-users-wrapper>label').siblings('.views-widget').add('#edit-users-wrapper+#edit-secondary-wrapper');
						} else if ($(e.target).attr('for') == 'edit-users') {			
							toggle = $('#edit-content-wrapper>label').siblings('.views-widget').add('#edit-content-wrapper+#edit-secondary-wrapper');
						}

						// Show/hide appropriate widget and table when minimize/maximize is clicked
						toggleWidget(toggle, function() {
							setVisibility($("#edit-content-wrapper .views-widget"), $('.pane-content-admin'));
							setVisibility($("#edit-users-wrapper .views-widget"), $('.pane-admin-users'));
						});
					});

				}
				

			// MY LIBRARY LAYOUT (FACULTY & ASSISTANT DASHBOARD)
				
		 		if ($('body').hasClass('page-dashboard')) {  // only perform on dashboard pages
		
					// Default radio button selection
					$("#edit-status-all").prop('checked', true);
					$("#edit-flagged-all").prop('checked', true);

					// Change "messages" to "feedback requests" in Feedback block
					var oldText = $('#block-privatemsg-privatemsg-menu a').text();
					var newText = oldText.replace("Messages", "Feedback requests");

					$('#block-privatemsg-privatemsg-menu a').text(newText);
				}


			// ADD CONTENT LAYOUT
				
				if ($('body').hasClass('page-node-add')) {  // only perform on Add Content page(s)
	
					// Remove options to create a page or an article 
					$('.node-type-list dt a:contains("Article")').parents("dt").remove();
					$('.node-type-list dt a:contains("Basic page")').parents("dt").remove();
					$('.node-type-list dd:contains("article")').remove();
					$('.node-type-list dd:contains("basic page")').remove();
				
					// Add option to bulk upload files
					var bulk = "<dt><a href='/admin/content/file/bulk_upload'>Bulk</a></dt><dd>Add multiple media resources in bulk</dd>";
					$(bulk).insertAfter('.node-type-list dd:first');

				}

				// Add Media/Add Bulk Media: remove options to tag with Person, Place, or Media (since these must be auto-set, not user-set)
				if ($('body').hasClass('page-node-add-media') || $('body').hasClass('page-node-edit') || $('body').hasClass('page-admin-content-file-bulk-upload')) {
					$('#edit-field-content-type-und option:contains("People")').add('#edit-default-values-field-content-type-und option:contains("People")').remove();
					$('#edit-field-content-type-und option[value="32"]').add('#edit-default-values-field-content-type-und option[value="32"]').remove();
					$('#edit-field-content-type-und option:contains("Media")').add('#edit-default-values-field-content-type-und option:contains("Media")').remove();
					$('#edit-field-content-type-und option[value="31"]').add('#edit-default-values-field-content-type-und option[value="31"]').remove();
					$('#edit-field-content-type-und option:contains("Places")').add('#edit-default-values-field-content-type-und option:contains("Places")').remove();
					$('#edit-field-content-type-und option[value="33"]').add('#edit-default-values-field-content-type-und option[value="33"]').remove();
					
					// Remove dashes from other options
					$('#edit-field-content-type-und option:contains("-")').add('#edit-default-values-field-content-type-und option:contains("-")').each(function(){
					    $(this).text($(this).text().replace('-',''));
					});
				}


				// Add instructions to Add Person name field 
				if ($('body').hasClass('page-node-add-person') || $('body').hasClass('page-node-edit')) {
					var helptext = "<div class='help-block'>Please enter a first and last name in the Name field, e.g. John Doe.</div>";
					// check to see if helptext exists
					if ($('.form-item-title .form-control + .help-block').length == 0) {
						$(helptext).insertAfter('.form-item-title .form-control');	
					}	
				}

				// Add file extension helptext to media browser (File Uploads)
				$(".media-browser-tab #upload-instructions ul").append("<li>Files must have an extension. For example, \"image.jpg\" will work, while \"image\" will not.</li>");

				// Change wording of "save" button to "publish"
				$('.page-node-add #edit-actions #edit-submit').text('Publish');

				// "Save as draft" button
				if ($('#edit-draft').length == 0) {
					$('.page-node-add #edit-actions #edit-submit').after('<button type="submit" id="edit-draft" name="op" value="Save as Draft" class="btn btn-success form-submit">Save Draft</button>');
				}

				// "Save as draft" button automatically unchecks Publish checkbox and then auto-submits
				$('.page-node-add #edit-draft').off('click').click(function(e) {
					e.preventDefault();
					$('.node-form-options #edit-status').prop('checked', false);
					$('.node-form').submit();
				});

				// Publish button auto-checks Publish and then auto-submits
				$('.page-node-add #edit-submit').off('click').click(function(e) {
					e.preventDefault();
					$('.node-form-options #edit-status').prop('checked', true);
					$('.node-form').submit();
				});


			// VIEW CONTENT LAYOUT
			
				if ($('body').hasClass('page-node')) { // only perform on node pages

					$('.flag-download, .flag-feedback').addClass('hidden');	// Hide download & feedback flags

					// Move download link into "Actions" area in sidebar
					var target = $('#block-node-actions');
					target.find('p').remove(); // remove placeholder paragraph

					var download = $('.views-field-download');
					target.find('.block-title').after(download);
					
					// Move flags to "Options" area in sidebar
					var flags = $('footer').find('li[class|="flag"]');
					target.find('.block-title').after(flags);

					// Hide "Actions" area if empty
					var links = $('#block-node-actions').find('li');
					if (links.length == 0) {
						$('#block-node-actions').hide();
					}
				}

				// Change "download" link to "go to link" for an oembed (web) media file
				if ($('body').hasClass('node-type-media')) {
					if($('.field-type-media .file[class*=oembed]').length > 0) {
						$('.views-field-download .field-content a').text("View online");
					}
					
					// Programatically trigger Download flag when Download link is clicked
					$('.views-field-download a').off('click').click(function() {
						if ($('.flag-download a').hasClass('flag-action')) {
							window.setTimeout(function() {
								$('.flag-download a').trigger('click');
							},1000);
						}
					});
				}

	    }

	    return obj;
	
	})();


// Helper functions
	
	// Get URL parameter
	function getParameter(theParameter) { 
	  var params = window.location.search.substr(1).split('&');
	 
	  for (var i = 0; i < params.length; i++) {
	    var p=params[i].split('=');
		if (p[0] == theParameter) {
		  return decodeURIComponent(p[1]);
		}
	  }
	  return false;
	}

	// Toggle (minimize/maximize) widgets
	function toggleWidget(target, callback) {
		target.slideToggle(400, callback);		
		if (target.siblings().find('.arrow').hasClass('fa-angle-up')) {
			target.siblings().find('.arrow').removeClass('fa-angle-up').addClass('fa-angle-down');
		} else if (target.siblings().find('.arrow').hasClass('fa-angle-down')) {
			target.siblings().find('.arrow').removeClass('fa-angle-down').addClass('fa-angle-up');
		} 
	}

	// Set element visibility
	function setVisibility(trigger, target) {
		if (trigger.css('display') == 'none') {
			target.hide();
		} else {
			target.show();
		}
	}

	// Append an up or down arrow to sortable columns in tables
	function appendSortArrow(asc, desc) {
		if (asc.parents('th').find('.fa-angle-down').length == 0) {
			asc.after("<i class='fa fa-angle-down'></i>");	
		} 
			
		if (desc.parents('th').find('.fa-angle-up').length == 0) {
			desc.after("<i class='fa fa-angle-up'></i>");
		}
	}

	// Insert a string after a word in a larger string
	function insertTextAfterWord(stringToSearch, stringToInsert, searchTerm, all) {
		var finalString = "";
		var str = searchTerm + " " + stringToInsert;
		var re = new RegExp(searchTerm,"g");

		if (all == true) {
			finalString = stringToSearch.replace(re, str); // if you want all the "hello"'s in the string to be replaced
		} else if (all == false) {
			finalString = stringToSearch.replace(searchTerm, str); // if you want only the first occurrence of "hello" to be replaced
		}

		return finalString;
	}

	// Make a div responsive to another element's size (height and/or width)
	function responsiveDiv(toSize, toCompare, offset, height, width) {

		// set toSize height = toCompare height
		if (height == true) {
			var toCompareHeight = toCompare.height();
			toSize.height(toCompareHeight + offset);
		}

		// set toSize width = toCompare width
		if (width == true) {
			var toCompareWidth = toCompare.width();
			toSize.width(toCompareWidth + offset);
		}
	}

	// Reorder a list of items
	function reorderList(list, newItems) {
		list.empty();
		list.append(newItems);
	}

	// Clear a form's checkboxes, inputs, and select pulldowns
	function resetForm(form, checkAll) {
		var selects = $(form).find('select option[selected]');
		var inputs = $(form).find('input[type=text]');
		var checkboxes = $(form).find('input[type=checkbox]');
		var reset = false;

		checkboxes.each(function() {
			if ($(this).prop('checked') != false) {
				reset = true;
			}
		});

		inputs.each(function() {
			if ($(this).attr('value')) {
				reset = true;
			}
		}); 	

		if (reset == true) {
			
			// Clear form values
			selects.removeAttr('selected');
			inputs.attr('value', '');
			// if (checkAll == true) {
			// 	// checkboxes.prop('checked', true);
			// } else {
			// 	checkboxes.removeAttr('checked');
			// }

			checkboxes.removeAttr('checked');

			$(form).submit();
		} 				
	}

	// Find a parent checkbox's child checkboxes (if present)
	function findChildCheckboxes(parentCheckbox) {
		var parentContainer = $(parentCheckbox).parents(".form-type-bef-checkbox");
		var childContainer = parentContainer.siblings(".bef-tree-child");
		var childCheckboxes = childContainer.find("input[type='checkbox']");
		
		return childCheckboxes;
	}

	// Center a child element within a parent element
	function centerChildInParent(child,parent) {
		// get child width
		var childWidth = $(child).width();
		// get parent width
		var parentWidth = $(parent).width();

		// calculate left property
		if (childWidth > parentWidth) {
			var left = (childWidth - parentWidth)/2 * -1;
			$(child).css('left',left);
		}
	}		

})(jQuery);

