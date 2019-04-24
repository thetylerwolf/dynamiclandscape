export default class TSne {
  constructor(props) {
    this.props = {
      perplexity: 15,
      earlyExaggeration: 2.1,
      learningRate: 180,
      iterations: 150,
      metric: "euclidean",
      onProgress: () => {},
      readyStateChange: () => {},
      onComplete: () => {},
      data: [],
      dim: 2,
      ...props
    };
  }

  init() {
    this.worker = new Worker("js/tsne-worker.js");

    this.worker.onmessage = e => {
      var msg = e.data;
      switch (msg.type) {
        case "PROGRESS_DATA":
          this._progress(msg.data);
          break;
        case "STATUS":
          // 'BUSY' or 'READY'
          this._readyStateChange(msg.data);
          break;
        case "DONE":
          this._complete(msg.data);
          break;
        default:
      }
    };

    this.worker.postMessage({
      type: "INPUT_DATA",
      data: this.props.data
    });
  }

  _progress(data) {
    this.props.onProgress(data);
  }

  _readyStateChange(data) {
    this.props.readyStateChange(data);
  }

  _dataChange(data) {
    console.log("this.props.data pre", this.props.data);
    this.props.data = data;
    console.log("this.props.data post", this.props.data);
  }

  _complete(data) {
    this.props.onComplete(data);
  }

  run() {
    this.worker.postMessage({
      type: "RUN",
      data: {
        perplexity: this.props.perplexity,
        earlyExaggeration: this.props.earlyExaggeration,
        learningRate: this.props.learningRate,
        nIter: this.props.iterations,
        metric: this.props.metric,
        dim: this.props.dim
      }
    });
  }
}
