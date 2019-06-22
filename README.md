# Netlight hackathon project

I joined a Netlight hackathon and created an easy-to-use graph visualization.

My goal was to create something from scratch which could easily be used in simple single-file-projects without the need of any transpilation.

This is the result:

![netlight-hackathon-project-graph.jpg](https://cdn.steemitimages.com/DQmPDh9Gg3bo6SAC5unnxv94T7URebfN7bnMAJPTqGDUo1c/netlight-hackathon-project-graph.jpg)

### A minimal example:

```
<script src="OyvindGraph.js"></script>
<div id="graphExample"></div>
<script>
  const graph = new OyvindGraph({
    id: "graphExample",
    width: "960",
    height: "540",
  });
  graph.createGraph(graphData);
</script>
```

The example above is a minimal example. Nearly all aspects of the graph can be styled by supplying additional parameters.

Everything is created from scratch using HTML Canvas.

The viewport scales proportionally to the standard deviation of the graph, making sure that the graph is always somewhat contained within the viewport.
