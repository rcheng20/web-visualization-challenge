// create init function
function init(){
    plot()
}

// create a change function
function change() {
  
    // create the plot
    plot();
  }


// function that creates the new plot
function plot(){


    d3.json("samples.json").then((data) =>{
        // get a list of all the ids
        var ids = data.names;
  
        // drop down menu with each id in the function below
        ids.forEach(id => d3.select('#selDataset').append('option').text(id).property("value", id));

        // use d3 to choose the ID and store it as a var
        var current = d3.selectAll("#selDataset").node().value;
     

        // search data for current id data
        filtered_bar = data.samples.filter(entry => entry.id == current);

        // create trace for the bar chart
        var trace_bar = {
            x: filtered_bar[0].sample_values.slice(0,10).reverse(),
            y: filtered_bar[0].otu_ids.slice(0, 10).reverse().map(int => "OTU " + int.toString()),
            text: filtered_bar[0].otu_labels.slice(0,10).reverse(),
            type:"bar",
            orientation: 'h'
        };
    
      
        // data for the bar graph
        var dataPlot = [trace_bar];

        // layout for the bar graph
        var layout_bar = {
            title : 'Top 10 OTU samples',
            margin: {
                l: 75,
                r: 100,
                t: 60,
                b: 60
            }

        };

        // using plotly, create a new bar
        Plotly.newPlot("bar", dataPlot, layout_bar);

        // create demographics
        filteredMeta = data.metadata.filter(entry => entry.id == currentID)
       
        // add demographics object
        var demographics = {
            'id: ': filteredMeta[0].id,
            'ethnicity: ': filteredMeta[0].ethnicity,
            'gender: ': filteredMeta[0].gender,
            'age: ': filteredMeta[0].age,
            'location: ': filteredMeta[0].location,
            'bbtype: ': filteredMeta[0].bbtype,
            'wfreq: ': filteredMeta[0].wfreq
        }
        // append the value to the demograhics
        panel = d3.select("#sample-metadata")

        // remove current info for new id
        panel.html("")
        
        // append key values from demographics
        Object.entries(demographics).forEach(([key, value]) => {
            panel.append('p').attr('style', 'font-weight: bold').text(key + value)
        });

        // create trace for the bubble chart
        var trace_bubble ={
            x : filteredID[0].otu_ids,
            y : filteredID[0].sample_values,
            text : filteredID[0].otu_labels,
            mode : 'markers',
            marker: {
                color : filteredID[0].otu_ids,
                size : filteredID[0].sample_values
            }
        }

        var data2 = [trace_bubble]

        // create the layout
        var layout_bubble = {
            title : 'Marker Size',
            showlegend : false, 
        }

        // plot via plotly
        Plotly.newPlot('bubble', data2, layout_bubble)
        console.log(filteredID)
        gauge()
    });
};

// run init
init();