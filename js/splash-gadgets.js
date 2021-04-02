/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
var openResponsiveMenu = function() {
  var el = document.getElementById('navbar');
  if (el.className === 'jumbo-header-navbar') {
    el.className = 'jumbo-header-navbar responsive';
  } else {
    el.className = 'jumbo-header-navbar';
  }
};

// Annotations on the 'cogs' and 'lego' divider images
var cannedAnnotations = {
  cogs : { id: '#640e3cde', x: 290, y: 180, w: 250, h: 270, text: 'You can create your own annotations on this image. Just click and drag with your mouse to draw a box.' },
  lego : { id: '#ffe68c32', x: 850, y: 30, w: 470, h: 270, text: 'Open source software. Free for non-commercial and commercial projects.' }
};

// Lazy-initialized Annotorious instances
var annoInstances = {
  cogs: null,
  lego: null
};

/** Helper functions **/

var toAnnotation = function(data) {
  return { 
    "@context": "http://www.w3.org/ns/anno.jsonld",
    "id": data.id,
    "type": "Annotation",
    "body": [{
      "type": "TextualBody",
      "value": data.text
    }],
    "target": {
      "selector": {
        "type": "FragmentSelector",
        "conformsTo": "http://www.w3.org/TR/media-frags/",
        "value": `xywh=pixel:${data.x},${data.y},${data.w},${data.h}`
      }
    }
  };
};

var getRandomBounds = function(maxX, maxY, minSize, maxSize, padding) {
  var w = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
  var h = Math.floor(Math.random() * (maxSize - minSize)) + minSize;

  var x = Math.floor(Math.random() * (maxX - w - 2 * padding)) + padding;
  var y = Math.floor(Math.random() * (maxY - h - 2 * padding)) + padding;

  return { x: x, y: y, w: w, h: h };
};

var animateBounds = function(bounds, onTick, onDone) {
  var duration = 20;
  var dx = bounds.w / duration;
  var dy = bounds.h / duration;

  var currentW = 3;
  var currentH = 3;

  var loop = function() {
    requestAnimationFrame(function() {
      currentW += dx;
      currentH += dy;

      onTick({ x: bounds.x, y: bounds.y, w: currentW, h: currentH });

      if (currentW < bounds.w || currentH < bounds.h)
        loop();
      else 
        onDone();
    });
  };

  loop();
};

var createAnimatedAnnotation = function(data, anno, closeAfter) {
  return new Promise(function(resolve) {
    var onTick = function(bounds) {
      var annotationState = Object.assign({}, data, bounds);
      anno.addAnnotation(toAnnotation(annotationState), true);
    }

    var keepOpen = closeAfter || 2000;

    var timeout = null;

    var onComplete = function() {
      setTimeout(function() { 
        anno.selectAnnotation(data.id); 
        
        timeout = setTimeout(function() {
          if (closeAfter)
            anno.selectAnnotation();

          resolve();
        }, keepOpen);
      }, 200);
    };

    anno.on('createSelection', function() {
      clearTimeout(timeout);
    });

    animateBounds(data, onTick, onComplete);
  });
}

// Observer that activates the canned annotations on the divider images
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting > 0) {
      var id = entry.target.id;
      if (!annoInstances[id]) {
        var anno = Annotorious.init({ 
          image: id,
          allowEmpty: true
        });

        annoInstances[id] = anno;

        createAnimatedAnnotation(cannedAnnotations[id], anno, 4000);
      }
    }
  });
}, { threshold: 0.8 });

observer.observe(document.getElementById('cogs'));
observer.observe(document.getElementById('lego'));  

// Scroll handler for change navbar opacity
var onScroll = function() {
  var navbar = document.getElementById('navbar');
  var offset = window.pageYOffset || window.scrollTop || 0;
  var opacity = offset < 600 ? Math.max(offset, 0) / 600 : 1;
  navbar.style.backgroundColor = 'rgba(34,34,34,' + opacity.toFixed(2) + ')';
};

// 'Random boxes' animation on header background
window.onload = async function() {
  // var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  // if (vw > 800) {
    document.addEventListener('scroll', onScroll);

    var MAX_BOXES = 100; // Start recycling annotations after this number

    var headerHeight = document.getElementsByClassName('jumbo-header-foreground')[0].offsetHeight;
    var headerWidth = document.getElementsByClassName('jumbo-header-foreground')[0].offsetWidth;
    var aspectRatio = headerHeight / headerWidth;

    var anno = Annotorious.init({ image: 'header-background', readOnly: true });

    var idx = 0; 

    while(true) {
      var bounds = getRandomBounds(1920, Math.min(960, 1920 * aspectRatio), 40, 200, 20);
      var data = Object.assign({ id: '#' + idx, text: 'Annotorious!' }, bounds);

      await createAnimatedAnnotation(data, anno);
      
      idx += 1;
      idx = idx % MAX_BOXES;
    }

  // }
}
