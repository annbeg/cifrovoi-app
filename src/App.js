import logo from './logo.svg';
import './App.css';
// import Highcharts from 'highcharts';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Chart from './components/Chart.js';
import TopChart from './components/TopChart.js';
// import Selecter from './components/Selecter.js';
import React, { useState, Component } from 'react'; 

// import селекта
import Select from "react-select";
import { FixedSizeList as List } from "react-window";


require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
// require('highcharts/modules/map')(Highcharts)

// ПРОБА НАЧАЛО

// ПРОБА КОНЕЦ

// НАЧАЛО СЕЛЕКТА


const height = 35;

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

const Selecter = ({ data, active, onChange }) => (

    <Select
        // style={{width:'10%'}}
        defaultValue={active}
        isMulti
        // name="colors"
        options = {data}
        components ={{ MenuList }}
        onChange = {(values) => onChange(values)}
        // onChange={(values) => console.log(values)}
        // className="basic-multi-select"
        // classNamePrefix="select"
    />
);



// КОНЕЦ СЕЛЕКТА


var users = require('./data_last.json');
var users1 = require('./data_3000tags.json');
var topTags = require('./angles_3000tags_notnull.json');
var topTagsKeys = Object.keys(topTags[0])
topTags = [topTagsKeys ,Object.values(topTags[0])][0].map((_, colIndex) => [topTagsKeys,Object.values(topTags[0])].map(row => row[colIndex]))


const skillsSet = require('./list_of_dicts_3000tags.json');

var mom = Object.keys(users['scipy'])

mom.forEach(function(part, index) {
  this[index] = Number(part);
}, mom);

mom = [mom,Object.values(users['scipy'])][0].map((_, colIndex) => [mom,Object.values(users['scipy'])].map(row => row[colIndex]))

var mom1 = Object.keys(users1['scipy'])

mom1.forEach(function(part, index) {
  this[index] = Number(part);
}, mom1);

mom1= [mom1,Object.values(users1['scipy'])][0].map((_, colIndex) => [mom1,Object.values(users1['scipy'])].map(row => row[colIndex]))





function App() {
  const [activeCharts, setActiveCharts] = useState([
    {value: 'scipy',label: 'scipy'}
  ]);
  
  const [optionSeries, setOptionSeries] = useState([
    {
    data: mom,
    name: 'numpy',
  },
  {
    data: mom1,
    name: 'scipy',
  }])

  const [topCategories, setTopCategories] = useState([1,2,3,4,5,6,7,8,9,10])
  const [optionTopSeries, setOptionTopSeries] = useState([
    {
        name: "Browsers",
        colorByPoint: true,
        data: [
            {
                name: topTags[0][0],
                y: topTags[0][1],
                place: 1
            },
            {
                name: topTags[1][0],
                y: topTags[1][1],
                place: 2
            },
            {
                name: topTags[2][0],
                y: topTags[2][1],
                place: 3
            },
            {
                name: topTags[3][0],
                y: topTags[3][1],
                place: 4
            },
            {
                name: topTags[4][0],
                y: topTags[4][1],
                place: 5
            },
            {
                name: topTags[5][0],
                y: topTags[5][1],
                place: 6
            },
            {
                name: topTags[6][0],
                y: topTags[6][1],
                place: 7
            },
            {
                name: topTags[7][0],
                y: topTags[7][1],
                place: 8
            },
            {
                name: topTags[8][0],
                y: topTags[8][1],
                place: 9
            },
            {
                name: topTags[9][0],
                y: topTags[9][1],
                place: 10
            }
          
            
        ]
    }
])
  
const [currentSelectedButtonClass, setCurrentSelectedButtonClass] = useState('ten')

const optionsStackOverflow = {
    title: {
      text: 'Востребованность на StackOverflow'
    },
    yAxis: [{
      height: '75%',
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        // text: 'AAPL'
      }
    }, {
      top: '75%',
      height: '25%',
      labels: {
        align: 'right',
        x: -3
      },
      offset: 0,
      title: {
        // text: 'MACD'
      }
    }],
    series: optionSeries}
  const optionsTopTags = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Топ быстрорастущих технологий'
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
      title: {
        text: 'Место'
      },
      categories: topCategories
    },
    yAxis: {
        title: {
            text: 'Коэфициент роста'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.name:.1f}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
    },

    series: optionTopSeries ,
    
}
  
  function onChoose(values) {
    if (values) {
        var series = []
        for (var step = 0;step<values.length;step++){
          var mom = Object.keys(users[values[step].label])

          mom.forEach(function(part, index) {
            this[index] = Number(part);
          }, mom);

          mom = [mom,Object.values(users[values[step].label])][0].map((_, colIndex) => [mom,Object.values(users[values[step].label])].map(row => row[colIndex]))

          var mom1 = Object.keys(users1[values[step].label])

          mom1.forEach(function(part, index) {
            this[index] = Number(part);
          }, mom1);

          mom1= [mom1,Object.values(users1[values[step].label])][0].map((_, colIndex) => [mom1,Object.values(users1[values[step].label])].map(row => row[colIndex]))
          series.push({
            data: mom,
            name: values[step].label,
          })
          series.push({
            data: mom1,
            name: values[step].label+' prediction',
          })
        }
        setOptionSeries(series)

    }else{
      setOptionSeries([])
    }
  }
  
  function changeTop(numb, id) {
    if (id == currentSelectedButtonClass) {
    }else{
      var element = document.getElementById(currentSelectedButtonClass);
      element.classList.remove("selected");
      
      var element = document.getElementById(id);
      element.classList.add("selected");
      
      var series = []
      for (var step = 0; step<10;step++) {
        series.push({
          name: topTags[step + numb - 10][0],
          y: topTags[step + numb - 10][1],
          place: step + numb - 9
        })
      }
      setOptionTopSeries([
        {
            // name: "Browsers",
            colorByPoint: true,
            data: series
        }
      ])
      setTopCategories([1+numb-10,2+numb-10,3+numb-10,4+numb-10,5+numb-10,6+numb-10,7+numb-10,8+numb-10,9+numb-10,10+numb-10])
      
      setCurrentSelectedButtonClass(id)
  }
  }
  return (
    <div className='App'>
      <div style={{padding: '3rem', fontSize:'2.4em', background: '#3f7c54', margin: '-20px', borderRadius: '0 0 10px 10px', color: 'white',boxShadow: '0 0 10px rgba(0,0,0,0.5)'}}>Мониторинг актуальных технологий</div>
      <div style={{height:'4rem'}}>

      </div>
      
          <Chart options={optionsStackOverflow}>
          </Chart>
        
      <div style={{height:'1rem'}}></div>
      <div style={{width:'50%', margin: 'auto'}}>
        <Selecter style = {{minHeight: '20rem'}} data={skillsSet} active={activeCharts} onChange = {onChoose}></Selecter>
      </div>
      <div style={{height: '3rem'}}></div>
      <div style={{height: '2px', background: '#b3b3b3'}}></div>
      <div style={{height: '3rem'}}></div>

      <TopChart options={optionsTopTags}>

      </TopChart>
      <div style={{height:'1rem'}}></div>
      <button id='ten' className='butt selected' onClick = {() => changeTop(10,'ten')}>Top 10</button>
      <button id='twenty' className='butt' onClick = {() => changeTop(20, 'twenty')}>Top 20</button>
      <button id='thirty' className='butt' onClick = {() => changeTop(30, 'thirty')}>Top 30</button>
      <button id='fourty' className='butt' onClick = {() => changeTop(40, 'fourty')}>Top 40</button>
      <div style={{height: '3rem'}}></div>
      <div style={{height: '4rem',background: '#3f7c54', margin: '-20px', borderRadius: '10px 10px 0 0', color: 'white',boxShadow: '0 0 10px rgba(0,0,0,0.5)'}}></div>
    </div>
  );
}

export default App;
