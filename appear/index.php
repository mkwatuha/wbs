Interactions
    Draggable
    Droppable
    Resizable
    Selectable
    Sortable
Widgets
    Accordion
    Autocomplete
    Button
    Datepicker
    Dialog
    Progressbar
    Slider
    Tabs
Effects
    Color Animation
    Toggle Class
    Add Class
    Remove Class
    Switch Class
    Effect
    Toggle
    Hide
    Show
Utilities
    Position
    Widget
About jQuery UI
    Getting Started
    Upgrade Guide
    Changelog
    Roadmap
    Subversion Access
    UI Developer Guidelines
Theming
    Theming jQuery UI
    jQuery UI CSS Framework
    ThemeRoller application
    Theme Switcher Widget

	
Functional demo:
show
Run Effect
Examples

    Default functionality

Open demo in a new window

Click the button above to preview the effect.
View Source

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>jQuery UI Effects - Show Demo</title>
	<script src="../template/js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="../viewdesign/js/jquery-ui-1.8.16.custom.min.js"></script>
	
	<link rel="stylesheet" href="theme/jquery.ui.all.css">
	<script src="jquery-1.6.2.js"></script>
	<script src="ui/jquery.effects.core.js"></script>
	<script src="ui/jquery.effects.blind.js"></script>
	<script src="ui/jquery.effects.bounce.js"></script>
	<script src="ui/jquery.effects.clip.js"></script>
	<script src="ui/jquery.effects.drop.js"></script>
	<script src="ui/jquery.effects.explode.js"></script>
	<script src="ui/jquery.effects.fold.js"></script>
	<script src="ui/jquery.effects.highlight.js"></script>
	<script src="ui/jquery.effects.pulsate.js"></script>
	<script src="ui/jquery.effects.scale.js"></script>
	<script src="ui/jquery.effects.shake.js"></script>
	<script src="ui/jquery.effects.slide.js"></script>
	<style>
	.toggler { width: 500px; height: 200px; }
	#button { padding: .5em 1em; text-decoration: none; }
	#effect { width: 240px; height: 135px; padding: 0.4em; position: relative; }
	#effect h3 { margin: 0; padding: 0.4em; text-align: center; }
	</style>
	<script>
	$(function() {
		// run the currently selected effect
		function runEffect() {
			// get effect type from 
			var selectedEffect = $( "#effectTypes" ).val();

			// most effect types need no options passed by default
			var options = {};
			// some effects have required parameters
			if ( selectedEffect === "scale" ) {
				options = { percent: 100 };
			} else if ( selectedEffect === "size" ) {
				options = { to: { width: 280, height: 185 } };
			}

			// run the effect
			$( "#effect" ).show( selectedEffect, options, 500, callback );
		};

		//callback function to bring a hidden box back
		function callback() {
			setTimeout(function() {
				$( "#effect:visible" ).removeAttr( "style" ).fadeOut();
			}, 1000 );
		};

		// set effect from select menu value
		$( "#button" ).click(function() {
			runEffect();
			return false;
		});

		$( "#effect" ).hide();
	});
	</script>
</head>
<body>

<div class="demo">

<div class="toggler">
	<div id="effect" class="ui-widget-content ui-corner-all">
		<h3 class="ui-widget-header ui-corner-all">Show</h3>
		<p>
			Etiam libero neque, luctus a, eleifend nec, semper at, lorem. Sed pede. Nulla lorem metus, adipiscing ut, luctus sed, hendrerit vitae, mi.
		</p>
	</div>
</div>

<select name="effects" id="effectTypes">
	<option value="blind">Blind</option>
	<option value="bounce">Bounce</option>
	<option value="clip">Clip</option>
	<option value="drop">Drop</option>
	<option value="explode">Explode</option>
	<option value="fold">Fold</option>
	<option value="highlight">Highlight</option>
	<option value="puff">Puff</option>
	<option value="pulsate">Pulsate</option>
	<option value="scale">Scale</option>
	<option value="shake">Shake</option>
	<option value="size">Size</option>
	<option value="slide">Slide</option>
</select>

<a href="#" id="button" class="ui-state-default ui-corner-all">Run Effect</a>

</div><!-- End demo -->



<div class="demo-description">
<p>Click the button above to preview the effect.</p>
</div><!-- End demo-description -->

</body>
</html>

