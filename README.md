# Important knowledge about Node

## Event Loop

- Underneath Node JS, the following hierarchy of execution:
  - `Node JS`
    - `V8` | `libuv`
- v8 is a interpreter of node js code into C++. There is an interface named `process.binding()` that connects JS code to C++ functions
- libuv is C++ implementationt that works with Host OS related functions
- Anytime a node code is executed, it runs a loop looking for 5 different activities before it determines to close the loop. Those are:
  1. Node looks at **Pending Timers** - setTimeOut, setInterval
  2. Any **Pending OS tasks** and **Pending Operations** and **callbacks**, such as: Server listening to port, http requests, networking etc
  3. Any **Long Running Operations** such as: File read, fs module
  4. Pause Execution and waits for :
  - new Pending task is done
  - new pending Operation is done
  - a timer is about to complete
  5. Looks at **Pending Timers - setImmediate**
  6. Handle any **`close` events**, such as in method call close call is used to perform activities before ending the call

## Node Threads

- Event loops are single threaded
- However, any operation that requires **common compute intenstive tasks**, `libuv` can run in parallel upto **4 different threads**
- The default count of threads can be limited to less than 4 using : `process.env.UV_THREADPOOL_SIZE = 2`
- Remember not all Node functions can not used thread pools. Specific functions such `fs module`, crypto libraries etc. can use thread pools
- In summary, only the calls that require threading use threadpool. And calls that directly involve OS interaction do not go through threadpool. As a result the response time depends on whether threadpool was involved or not
- Another important note about threadpool is that if a long running process is awaited on, then the thread becomes free to pick up another task, and returns to the long running process only after finishing the task
- View example by searching for [threads.js](./threads.js) in this repo

## Performance Improvement Ideas

- Using Node in Cluster mode - This allows to simulate multi thread approach
- Using worker threads - is another approach that is more of experimental

### Operating in Cluster Mode

- In this mode, when first node execution starts it spins off an instance of cluster manager
- Cluster manager is responsible for managing life cycle of worker nodes
- Once cluster manager is created it invokes the `cluster.fork()` method. This forces Node engine to read the target JS file again and start with a worker node
- [Example of cluster mode here](./index.js)
- The number of clusters that can run should be considered based on hardware resource available on servers. Otherwise just adding clusters would only increase wait time proportionate to the wait time for CPU cores. Hence matching to physical cores or logical core is a good idea
  - **Logical Core Count** = No of Physical Cores \* No of Threads per Core

### PM2 CLI

- Unitech/pm2 is a universally accepted tool for cluster management in production grade
- PM2 manages cluster management aspect and automatically brings up new instance in case one goes down
- Install using `npm install -g pm2`
- Manual cluster code can go away once PM2 is available
- Run node in PM2 mode : `pm2 start index-pm2.js -i 0`
  - `i 0`: Default : assign number of cluster = number of logical cores available
- To stop the clusters use command: `pm2 delete index-pm2`

### Using Worker Threads for Performance Improvement

- Worker threads package can be installed using `npm install --save webworker-threads`

## Utility to draw Performance Baseline

- Apache Baseline available in Mac: `ab -c 4 -n 10 localhost:3000/`
  - c: concurrency number
  - n: number of total requests
