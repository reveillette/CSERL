<?php
/**
 * @file
 * The primary PHP file for this theme.
 */

function ceml_preprocess_node(&$variables) {
  $variables['date'] = format_date($variables['node']->created, 'custom', 'F j, Y');
  $variables['submitted'] = t('!datetime', array('!datetime' => $variables['date']));

}

?>
