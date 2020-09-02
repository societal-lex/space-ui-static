"use strict";var wordCloudModule=function(e,t){return{wordCloudGenerator:function(n){var o,{containerid:r,wordclouddata:a,stopwords:s,padding:i}=n;o="string"==typeof i&&4==i.split(" ").length?i:"20 20 20 20",function(t,n){if(!e)throw new Error("D3 Library not available");if(!t&&"string"!=typeof t)throw new Error("Please supply Container ID");if(!n||"string"!=typeof n)throw new Error("Please supply Word Cloud Data")}(r,a),function(n,o,r){var s=function(e,t){var n="also,just,know,now,like,we,saw,seen,see,seing,get,dad,mom,if,else,got,sir,madam,mam,go,want,yet,man,men,woman,women,to,be,in,so,the,yes,poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";Array.isArray(t)?n+=","+t.join(","):"string"==typeof t&&(n+=","+t.trim());var o={};n=n.toLowerCase();var r=e.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);return 1==r.length?o[r[0]]=1:r.forEach(function(e){(e=(e=e.toLowerCase()).trim())&&e.length>1&&isNaN(parseFloat(e))&&~n.indexOf(e)>=0&&(o[e]?o[e]++:o[e]=1)}),o}(a,r);let i=n.node().getBoundingClientRect().width,l=n.node().getBoundingClientRect().height;var h=e.scaleOrdinal(e.schemeCategory20c),u=e.entries(s),d=e.scaleLinear().domain([0,e.max(u,function(e){return e.value})]).range([10,100]);t().size([i,l]).timeInterval(20).words(u).fontSize(function(e){return d(e.value)}).text(function(e){return e.key}).rotate(function(){return 90*~~(2*Math.random())}).font("Impact").on("end",function(e){n.append("g").attr("transform","translate("+[i>>1,l>>1]+")").selectAll("text").data(e).enter().append("text").style("font-size",function(e){return d(e.value)+"px"}).style("font-family","Impact").style("fill",function(e,t){return h(t)}).attr("text-anchor","middle").attr("transform",function(e){return"translate("+[e.x,e.y]+")rotate("+e.rotate+")"}).text(function(e){return e.key})}).start(),t().stop()}(function(t,n){var o=e.selectAll(t);let r=o.nodes();if(!r||0==r.length)throw new Error("No Container found with element selector : "+t);if(r.length>1)throw new Error('Multiple Container found with element selector : "'+t+'". Please specify unique id or class of the element');let a="750 750".split(" "),s=r[0].getBoundingClientRect().height||a[0],i=r[0].getBoundingClientRect().width||a[1],l=window.getComputedStyle(r[0]),h=n.split(" ");return i=i-(parseFloat(l.getPropertyValue("padding-left"))||h[0])-(parseFloat(l.getPropertyValue("padding-right"))||h[1]),s=s-(parseFloat(l.getPropertyValue("padding-top"))||h[2])-(parseFloat(l.getPropertyValue("padding-bottom"))||h[3])-80,console.log("Width : ",i),console.log("Height : ",s),o.append("svg").attr("class","svgElement").style("height",s).attr("width",i)}(r,o),0,s)}}};