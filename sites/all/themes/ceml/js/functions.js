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


// Site functions
(function ($) { 
	$(document).ready(function() {

		// Change link on logo to direct to UC site
		$("#navbar .logo").attr('href', '/');

		// Show find content overlay with find content hash
		if (window.location.hash == "#find-content") {
			window.setTimeout(function() {
				$( ".menu a:contains('Find Content')" ).parents('li.leaf').addClass('active');
				$('#block-mefibs-mefibs-find-content-page-find').slideToggle();
			}, 1000);
		}

		// Reset find content checkboxes on page load
		if ($('body').hasClass('page-find-content')) {
			resetForm("#views-exposed-form-find-content-page");			
 		}

		// Minimize widgets on page load
	
			// Admin Dashboard
			if ($('body').hasClass('page-admin-dashboard') || $('body').hasClass('page-admin') || $("body").hasClass('page-admin-users') || $("body").hasClass('page-admin-content') || $("body").hasClass('page-user')) {
				var initialLibrary = $('label[for="edit-content"]').siblings().add('#block-views-exp-content-admin-page #edit-secondary-wrapper');
				toggleWidget(initialLibrary, function() {

					// Set initial arrow direction
					$('label[for="edit-content"] .arrow').removeClass('fa-angle-up').addClass('fa-angle-down');

					// Set initial visibility
					setVisibility($("#edit-users-wrapper .views-widget"), $('.pane-admin-users'));
					setVisibility($("#edit-content-wrapper .views-widget"), $('.pane-content-admin'));

				});

			}
			
			// Append "Media" to media teaser type
			$('.node-teaser.node-media .field-name-field-content-type a').each(function(i) {
				var subType = $(this).text();
				var fullType = "Media: " + subType;
				$(this).text(fullType);
			});

			// Sidebars
			if ($('.region-sidebar-first').length > 0 && !$('body').hasClass('page-node')) {
				var initialHidden = $('.block-title').siblings();
				toggleWidget(initialHidden);
			}

		f.init();

	});

    $(document).ajaxComplete(function(e) {
	    e.stopPropagation();
	    f.init();
	});

	var f = (function() {

	    var obj = {};
	    obj.init = function () {		

			// Sitewide blocks

				// Text replacements

				// Menus
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

				
				// Sidebars

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

					// Disable tooltips
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

					// Show/hide description on mouseenter/mouseleave 
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
					$('.region-sidebar-first, .region-header').off('click').on('click', '.views-exposed-widget label, .block label', function(e) {
						var secondaryWidget = $(this).parents('.views-exposed-widget').siblings('.views-widget-filter-secondary');
						toggleWidget($(this).siblings('.views-widget').add(secondaryWidget));
					});

				// Tables 
					
					// Programatically add up and down arrows to active table headers for each table on the page
					var tables = $(".table");
					tables.each(function(i) {
						var tableHeaderAsc = $(this).find("th.active a.active[href*='asc']");
						var tableHeaderDesc = $(this).find("th.active a.active[href*='desc']");

						appendSortArrow(tableHeaderAsc,tableHeaderDesc);
					});
					
				// Teasers

					// Replace audio image
					// $('.node-teaser .file-audio img').attr('src','sites/default/files/styles/medium/public/media-icons/default/audio-mpeg.png').css('width', '100%');

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

					// Hide "Read More" text
					$('.node-readmore a').text('');

					// Remove video controls
					// $('.node-teaser video').removeAttr('controls');
					
					// Horizontally center videos in container 
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

				// Miscellaneous
				
					// Change collapsible fieldsets to open
					$('#edit-timezone--3, #edit-privatemsg--2, #edit-field-map-und-0').removeClass('collapsible');

					// Change wording of Add Another Item button
					$('.field-add-more-submit').text("Add Item");

					// Add top margin to content when breadcrumb is not present
					if ($('.main-container ol.breadcrumb').length == 0) {
						$('.page-header').css({
							"display": "block",
							"margin-top": "170px"
						})
						// $('.region-content').css('margin-top', '170px');
					}

					// Turn cancel links into buttons
					$('#edit-cancel').addClass('btn btn-secondary')

				// Footer

					// Remove container class from footer and add to region-footer
					$('.footer').removeClass('container');
					$('.region-footer').addClass('container');

					$('.page-search .breadcrumb li.active').remove();


			// Mockup 2: Search & Find Content

				// Search box

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
				
				
				// Find Content overlay	
				if ($('body').hasClass('page-find-content')) {

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

					// Make sure height equals height of main container
					responsiveDiv($('#block-mefibs-mefibs-find-content-page-find'), $('.main-container'), 0, true, false);
					$(window).resize(function() {
						responsiveDiv($('#block-mefibs-mefibs-find-content-page-find'), $('.main-container'), 0, true, false);
					})

				}

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


			// Mockup 3: Sign in and Create account 
				
				// Disable role field
				// $('#edit-field-user-role-und').prop('disabled','disabled');

				// Change sign in button to btn-success
				$("#user-login .form-actions button").removeClass('btn-default');

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

				// Show/hide reset password on click
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
				if ($('body').hasClass('page-user-edit')) {
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
				

			// Mockup 4: Admin dashboard 
				
				if ($('body').hasClass('page-admin-dashboard') || $('body').hasClass('page-admin') || $("body").hasClass('page-admin-users') || $("body").hasClass('page-admin-content')) {

					// Show/hide users widget and users table when content widget label is clicked
					$('.region-sidebar-first').on('click', '.views-exposed-widget>label', function(e) {
						var toggle;

						if($(e.target).attr('for') == 'edit-content') {
							toggle = $('#edit-users-wrapper>label').siblings('.views-widget').add('#block-views-exp-content-admin-page #edit-secondary-wrapper');
						} else if ($(e.target).attr('for') == 'edit-users') {			
							toggle = $('#edit-content-wrapper>label').siblings('.views-widget').add('#block-views-exp-content-admin-page #edit-secondary-wrapper');
						}

						// Show/hide appropriate widget and table when minimize/maximize is clicked
						toggleWidget(toggle, function() {
							setVisibility($("#edit-content-wrapper .views-widget"), $('.pane-content-admin'));
							setVisibility($("#edit-users-wrapper .views-widget"), $('.pane-admin-users'));
						});
					});

				}
				
			// Mockup 5: Faculty & Assistant Dashboard
				
					// Change "messages" to "feedback requests" in Feedback block
					var oldText = $('#block-privatemsg-privatemsg-menu a').text();
					var newText = oldText.replace("Messages", "Feedback requests");

					$('#block-privatemsg-privatemsg-menu a').text(newText);



			// Mockup 7: Add content page
				
				if ($('body').hasClass('page-node-add')) {
	
					// Remove options to create a page or an article 
					$('.node-type-list dt a:contains("Article")').parents("dt").remove();
					$('.node-type-list dt a:contains("Basic page")').parents("dt").remove();
					$('.node-type-list dd:contains("article")').remove();
					$('.node-type-list dd:contains("basic page")').remove();
				
					// Add option to bulk upload files
					var bulk = "<dt><a href='/file/add'>Bulk</a></dt><dd>Bulk upload multiple files</dd>";
					$(bulk).insertAfter('.node-type-list dd:first');

				}

				// Add Media: remove options to tag with Person, Place, or Media 
				if ($('body').hasClass('page-node-add-media') || $('body').hasClass('page-node-edit')) {
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

				// Add instructions to Add Person name field 
				if ($('body').hasClass('page-node-add-person') || $('body').hasClass('page-node-edit')) {
					var helptext = "<div class='help-block'>Please enter a first and last name in the Name field, e.g. John Doe.</div>";
					$(helptext).insertAfter('.form-item-title .form-control');	
				}

				// Change "save" button to "publish"
				$('.page-node-add #edit-actions #edit-submit').text('Publish');

				// Save as draft button
				if ($('#edit-draft').length == 0) {
					$('.page-node-add #edit-actions #edit-submit').after('<button type="submit" id="edit-draft" name="op" value="Save as Draft" class="btn btn-success form-submit">Save Draft</button>');
				}

				// Save as draft button unchecks Publish and then submits
				$('.page-node-add #edit-draft').off('click').click(function(e) {
					e.preventDefault();
					$('.node-form-options #edit-status').prop('checked', false);
					$('.node-form').submit();
				});

				// Publish button checks Publish and then submits
				$('.page-node-add #edit-submit').off('click').click(function(e) {
					e.preventDefault();
					$('.node-form-options #edit-status').prop('checked', true);
					$('.node-form').submit();
				});


			// Mockup 8: View Content
			
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

				if ($('body').hasClass('page-node')) {

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


	    }

	    return obj;
	})();


// Helper functions
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

function toggleWidget(target, callback) {
	target.slideToggle(400, callback);		
	if (target.siblings().find('.arrow').hasClass('fa-angle-up')) {
		target.siblings().find('.arrow').removeClass('fa-angle-up').addClass('fa-angle-down');
	} else if (target.siblings().find('.arrow').hasClass('fa-angle-down')) {
		target.siblings().find('.arrow').removeClass('fa-angle-down').addClass('fa-angle-up');
	} 
}

function setVisibility(trigger, target) {
	if (trigger.css('display') == 'none') {
		target.hide();
	} else {
		target.show();
	}
}

function appendSortArrow(asc, desc) {
	if (asc.parents('th').find('.fa-angle-down').length == 0) {
		asc.after("<i class='fa fa-angle-down'></i>");	
	} 
		
	if (desc.parents('th').find('.fa-angle-up').length == 0) {
		desc.after("<i class='fa fa-angle-up'></i>");
	}
}

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

function resetForm(form) {
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
		checkboxes.removeAttr('checked');
		$(form).submit();
	} 				
}

function findChildCheckboxes(parentCheckbox) {
	var parentContainer = $(parentCheckbox).parents(".form-type-bef-checkbox");
	var childContainer = parentContainer.siblings(".bef-tree-child");
	var childCheckboxes = childContainer.find("input[type='checkbox']");
	
	return childCheckboxes;
}

})(jQuery);


