/*
 * Vue Chartkick
 * Create beautiful charts with one line in Vue.js
 * https://github.com/ankane/vue-chartkick
 * v0.1.3
 * @license MIT
 */

var chartId = 1

var createComponent = function(Vue, tagName, chartType) {
  var chartProps = ["min", "max", "colors", "stacked", "discrete", "label", "xtitle", "ytitle", "library", "download", "refresh", "donut", "legend", "curve", "title"]
  Vue.component(tagName, {
    props: ["data", "id", "width", "height"].concat(chartProps),
    template: '<div v-bind:id="chartId" v-bind:style="chartStyle">Loading...</div>',
    data: function() {
      return {
        chartId: null
      }
    },
    computed: {
      chartStyle: function() {
        // hack to watch data and options
        this.data
        this.chartOptions

        return {
          height: this.height || "300px",
          lineHeight: this.height || "300px",
          width: this.width || "100%",
          textAlign: "center",
          color: "#999",
          fontSize: "14px",
          fontFamily: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif"
        }
      },
      chartOptions: function() {
        var options = {}
        var props = chartProps
        for (var i = 0; i < props.length; i++) {
          var prop = props[i]
          if (this[prop] !== undefined) {
            options[prop] = this[prop]
          }
        }
        return options
      }
    },
    created: function() {
      this.chartId = this.chartId || this.id || ("chart-" + chartId++)
    },
    mounted: function() {
      this.chart = new chartType(this.chartId, this.data, this.chartOptions)
    },
    updated: function() {
      this.chart.updateData(this.data, this.chartOptions)
    }
  })
}

var VueChartkick = {
  version: "0.1.3",
  install: function(Vue, options) {
    var Chartkick = options.Chartkick
    createComponent(Vue, "line-chart", Chartkick.LineChart)
    createComponent(Vue, "pie-chart", Chartkick.PieChart)
    createComponent(Vue, "column-chart", Chartkick.ColumnChart)
    createComponent(Vue, "bar-chart", Chartkick.BarChart)
    createComponent(Vue, "area-chart", Chartkick.AreaChart)
    createComponent(Vue, "scatter-chart", Chartkick.ScatterChart)
    createComponent(Vue, "geo-chart", Chartkick.GeoChart)
    createComponent(Vue, "timeline", Chartkick.Timeline)
  }
}

// in browser
if (typeof window !== "undefined" && window.Vue && window.Chartkick) {
  window.Vue.use(VueChartkick, {Chartkick: window.Chartkick})
}

module.exports = VueChartkick
