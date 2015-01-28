'use strict';
var XLSX = require('xlsx');
module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
        run: ['./output']
    },
    mustache_render: {
        run: {
            files: (function() {
                // 設定
                var inpFile = 'サンプル.xlsx';
                var inpSheet = 'Sheet1';

                // ファイル読み込み
                var data = XLSX.readFile(inpFile);
                var sheet = data.Sheets[inpSheet];

                // ファイル内容整形
                var json = XLSX.utils.sheet_to_json(sheet);

                var files = [];
                for (var i=0, j=json.length; i<j; i++){
                    var pageData = json[i];

                    // files配列にオブジェクトを追加
                    files.push({
                        // ページデータ
                        data: pageData,
                        // テンプレートファイルを指定
                        template: './template.html',
                        // 生成するhtmlの場所と名前を設定
                        dest: './output/' + pageData.パラメータ1 + '_' + pageData.パラメータ2 + '_' + pageData.パラメータ3 + '.html'
                    });
                }
                // 配列を返却
                return files;
            }())
        }
    }
  });
  grunt.loadNpmTasks('grunt-mustache-render');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('run', ['clean', 'mustache_render']);
};
