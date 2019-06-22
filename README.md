# Netlight hackathon project

I joined a Netlight hackathon and created an easy-to-use graph visualization.

![netlight-hackathon-project-graph.jpg](https://cdn.steemitimages.com/DQmPDh9Gg3bo6SAC5unnxv94T7URebfN7bnMAJPTqGDUo1c/netlight-hackathon-project-graph.jpg)

### Creating a graph can be as simple as this:

```
<script src="oyvindGraph.js"></script>
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
