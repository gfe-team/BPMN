import { translations } from './translations';

export default function (template: any, replacements: any) {
	replacements = replacements || {};
	// Translate

	template = translations[template] || template;

	// Replace
	return template.replace(/{([^}]+)}/g, function (_: any, key: any) {
		return replacements[key] || '{' + key + '}';
	});
}
