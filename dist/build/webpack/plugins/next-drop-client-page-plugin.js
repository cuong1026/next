"use strict";exports.__esModule=true;exports.DropClientPage=exports.ampFirstEntryNamesMap=void 0;var _webpack=require("webpack");var _constants=require("../../../next-server/lib/constants");const isWebpack5=parseInt(_webpack.version)===5;const ampFirstEntryNamesMap=new WeakMap();exports.ampFirstEntryNamesMap=ampFirstEntryNamesMap;const PLUGIN_NAME='DropAmpFirstPagesPlugin';// Prevents outputting client pages when they are not needed
class DropClientPage{constructor(){this.ampPages=new Set();}apply(compiler){compiler.hooks.compilation.tap(PLUGIN_NAME,(compilation,{normalModuleFactory})=>{// Recursively look up the issuer till it ends up at the root
function findEntryModule(mod){const queue=new Set([mod]);for(const module of queue){if(isWebpack5){// @ts-ignore TODO: webpack 5 types
const incomingConnections=compilation.moduleGraph.getIncomingConnections(module);for(const incomingConnection of incomingConnections){if(!incomingConnection.originModule)return module;queue.add(incomingConnection.originModule);}continue;}for(const reason of module.reasons){if(!reason.module)return module;queue.add(reason.module);}}return null;}function handler(parser){function markAsAmpFirst(){const entryModule=findEntryModule(parser.state.module);if(!entryModule){return;}// @ts-ignore buildInfo exists on Module
entryModule.buildInfo.NEXT_ampFirst=true;}if(isWebpack5){parser.hooks.preDeclarator.tap(PLUGIN_NAME,declarator=>{var _declarator$id;if((declarator==null?void 0:(_declarator$id=declarator.id)==null?void 0:_declarator$id.name)===_constants.STRING_LITERAL_DROP_BUNDLE){markAsAmpFirst();}});return;}parser.hooks.varDeclaration.for(_constants.STRING_LITERAL_DROP_BUNDLE).tap(PLUGIN_NAME,markAsAmpFirst);}normalModuleFactory.hooks.parser.for('javascript/auto').tap(PLUGIN_NAME,handler);normalModuleFactory.hooks.parser.for('javascript/esm').tap(PLUGIN_NAME,handler);normalModuleFactory.hooks.parser.for('javascript/dynamic').tap(PLUGIN_NAME,handler);if(!ampFirstEntryNamesMap.has(compilation)){ampFirstEntryNamesMap.set(compilation,[]);}const ampFirstEntryNamesItem=ampFirstEntryNamesMap.get(compilation);compilation.hooks.seal.tap(PLUGIN_NAME,()=>{if(isWebpack5){for(const[name,entryData]of compilation.entries){for(const dependency of entryData.dependencies){var _module$buildInfo;// @ts-ignore TODO: webpack 5 types
const module=compilation.moduleGraph.getModule(dependency);if(module==null?void 0:(_module$buildInfo=module.buildInfo)==null?void 0:_module$buildInfo.NEXT_ampFirst){ampFirstEntryNamesItem.push(name);// @ts-ignore @types/webpack has outdated types for webpack 5
compilation.entries.delete(name);}}}return;}// Remove preparedEntrypoint that has bundle drop marker
// This will ensure webpack does not create chunks/bundles for this particular entrypoint
for(let i=compilation._preparedEntrypoints.length-1;i>=0;i--){var _entrypoint$module,_entrypoint$module$bu;const entrypoint=compilation._preparedEntrypoints[i];if(entrypoint==null?void 0:(_entrypoint$module=entrypoint.module)==null?void 0:(_entrypoint$module$bu=_entrypoint$module.buildInfo)==null?void 0:_entrypoint$module$bu.NEXT_ampFirst){ampFirstEntryNamesItem.push(entrypoint.name);compilation._preparedEntrypoints.splice(i,1);}}for(let i=compilation.entries.length-1;i>=0;i--){var _entryModule$buildInf;const entryModule=compilation.entries[i];if(entryModule==null?void 0:(_entryModule$buildInf=entryModule.buildInfo)==null?void 0:_entryModule$buildInf.NEXT_ampFirst){compilation.entries.splice(i,1);}}});});}}exports.DropClientPage=DropClientPage;
//# sourceMappingURL=next-drop-client-page-plugin.js.map