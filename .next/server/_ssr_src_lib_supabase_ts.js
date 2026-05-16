"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_ssr_src_lib_supabase_ts";
exports.ids = ["_ssr_src_lib_supabase_ts"];
exports.modules = {

/***/ "(ssr)/./src/lib/supabase.ts":
/*!*****************************!*\
  !*** ./src/lib/supabase.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSupabaseAdmin: () => (/* binding */ getSupabaseAdmin),\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(ssr)/./node_modules/@supabase/supabase-js/dist/index.mjs\");\n\nconst supabaseUrl = \"https://ralzernenssphytganor.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhbHplcm5lbnNzcGh5dGdhbm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTkyNTgsImV4cCI6MjA5NDMzNTI1OH0.DO9pkBjTi0c8xRj1QwQwauPqUADtCwSmIf7d80vcNc0\";\n// Client-safe instance (use this in components)\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n// Server-only instance (only import in API routes / server actions)\nconst getSupabaseAdmin = ()=>{\n    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\n    if (!serviceKey) throw new Error(\"SUPABASE_SERVICE_ROLE_KEY not set\");\n    return (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, serviceKey);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9zcmMvbGliL3N1cGFiYXNlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFxRDtBQUVyRCxNQUFNQyxjQUFjQywwQ0FBb0M7QUFDeEQsTUFBTUcsa0JBQWtCSCxrTkFBeUM7QUFFakUsZ0RBQWdEO0FBQ3pDLE1BQU1LLFdBQVdQLG1FQUFZQSxDQUFDQyxhQUFhSSxpQkFBaUI7QUFFbkUsb0VBQW9FO0FBQzdELE1BQU1HLG1CQUFtQjtJQUM5QixNQUFNQyxhQUFhUCxRQUFRQyxHQUFHLENBQUNPLHlCQUF5QjtJQUN4RCxJQUFJLENBQUNELFlBQVksTUFBTSxJQUFJRSxNQUFNO0lBQ2pDLE9BQU9YLG1FQUFZQSxDQUFDQyxhQUFhUTtBQUNuQyxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmVsb3JpeC1haS8uL3NyYy9saWIvc3VwYWJhc2UudHM/MDZlMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI7XG5cbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMITtcbmNvbnN0IHN1cGFiYXNlQW5vbktleSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZITtcblxuLy8gQ2xpZW50LXNhZmUgaW5zdGFuY2UgKHVzZSB0aGlzIGluIGNvbXBvbmVudHMpXG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSk7XG5cbi8vIFNlcnZlci1vbmx5IGluc3RhbmNlIChvbmx5IGltcG9ydCBpbiBBUEkgcm91dGVzIC8gc2VydmVyIGFjdGlvbnMpXG5leHBvcnQgY29uc3QgZ2V0U3VwYWJhc2VBZG1pbiA9ICgpID0+IHtcbiAgY29uc3Qgc2VydmljZUtleSA9IHByb2Nlc3MuZW52LlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVk7XG4gIGlmICghc2VydmljZUtleSkgdGhyb3cgbmV3IEVycm9yKFwiU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSBub3Qgc2V0XCIpO1xuICByZXR1cm4gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzZXJ2aWNlS2V5KTtcbn07XG4iXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VBbm9uS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJzdXBhYmFzZSIsImdldFN1cGFiYXNlQWRtaW4iLCJzZXJ2aWNlS2V5IiwiU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./src/lib/supabase.ts\n");

/***/ })

};
;