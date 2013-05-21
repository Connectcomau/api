$(document).ready(function () {

	var index_div = $("#index");
	var product = index_div.data('product');
	var category = index_div.data('category');

	var api_div = $("#api-all");

	$.get("../../json/" + product + "/" + category + ".json", function(data) {
		generate_api(data);
		//generate_api(JSON.parse(data));
	});

	function generate_api(data) {


		/*

		need to implement some kind of templating system later on
		this is hacky.

		*/

		var endpoints = data['endpoints'];
		for (var i = 0; i < endpoints.length; i++) {

			ep = endpoints[i];
			safe_name = ep.name.replace(/ /g,'-')
			str = '';
			str += '<div class="index-item-wrapper">';
			str += '<a href="#'+safe_name+'"><span class="index-item">'+ep.name+'</span></a><br />';
			str += '</div>';
			str += '<p>'+ep.description+'</p>';
			index_div.append(str);

			str = '<div id="'+safe_name+'"  class="row lighter-grey">';
			str += '<h3 class="route-name">'+ep.name+'</h3>';
			str += '<code class="endpoint">'+ep.method + " " + ep.url+'</code>';
			str += '<h6>Description</h6><p class="detail">'+ep.description+'</p>';
			str += '<h6>Parameters</h6><p class="detail">';
			if (ep.parameters != null) {
				str += '<table class="parameters">';
				for (var j = 0; j < ep.parameters.length; j++) {
					str += '<tr><td><code>'+ep.parameters[j].name+'</code></td><td>'+ep.parameters[j].description+'</td></tr>';
				}
				str += '</table>'
			} else {
				str += '(none)';
			}
			str += '</p>';

			str += '<div class="code-header request"><h4>Example Request Body</h4></div>';
			str += '<pre class="json-block prettyprint linenums">';
			if (ep.examples.request != null) {
				str += vkbeautify.json(JSON.stringify(ep.examples.request));
			} else {
				str += '(none)';
			}
			str += '</pre>';
			str += '<div class="code-header response"><h4>Example Response Body</h4></div>';
			str += '<pre class="json-block prettyprint linenums">';
			if (ep.examples.response != null) {
				str += vkbeautify.json(JSON.stringify(ep.examples.response));
			} else {
				str += '(none)';
			}
			str += '</pre>';
			str += '</div>';
			str += '<br />'
			api_div.append(str);

		}

	}

});