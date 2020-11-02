"use strict";exports.__esModule=true;exports.default=resolveRewrites;var _pathMatch=_interopRequireDefault(require("./path-match"));var _prepareDestination=_interopRequireDefault(require("./prepare-destination"));var _normalizeTrailingSlash=require("../../../../client/normalize-trailing-slash");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const customRouteMatcher=(0,_pathMatch.default)(true);function resolveRewrites(asPath,pages,basePath,rewrites,query,resolveHref){if(!pages.includes(asPath)){for(const rewrite of rewrites){const matcher=customRouteMatcher(rewrite.source);const params=matcher(asPath);if(params){if(!rewrite.destination){// this is a proxied rewrite which isn't handled on the client
break;}const destRes=(0,_prepareDestination.default)(rewrite.destination,params,query,true,rewrite.basePath===false?'':basePath);asPath=destRes.parsedDestination.pathname;Object.assign(query,destRes.parsedDestination.query);if(pages.includes((0,_normalizeTrailingSlash.removePathTrailingSlash)(asPath))){// check if we now match a page as this means we are done
// resolving the rewrites
break;}// check if we match a dynamic-route, if so we break the rewrites chain
const resolvedHref=resolveHref(asPath);if(resolvedHref!==asPath&&pages.includes(resolvedHref)){break;}}}}return asPath;}
//# sourceMappingURL=resolve-rewrites.js.map