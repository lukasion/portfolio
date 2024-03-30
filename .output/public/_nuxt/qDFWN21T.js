var q=Object.defineProperty;var H=(c,e,s)=>e in c?q(c,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):c[e]=s;var a=(c,e,s)=>(H(c,typeof e!="symbol"?e+"":e,s),s);import{_ as W}from"./CiH-RzDB.js";import{f as y,r as f,z as N,A as G,c as v,B as X,C,o as p,a as t,h as r,D as b,j,p as Y,e as U,d as u,b as h,E as Q,t as L,g as T,v as A,F as D,x as I,q as O,w as J}from"./BLawB_yt.js";import{u as z,_ as K}from"./CezrDz0Y.js";import{_ as V}from"./DlAUqK2U.js";import E from"./PYrOpUem.js";import"./B6EJKngc.js";import"./Bcw-ZHf8.js";const Z=Symbol.for("nuxt:client-only"),ee=y({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(c,{slots:e,attrs:s}){const n=f(!1);return N(()=>{n.value=!0}),G(Z,!0),i=>{var m;if(n.value)return(m=e.default)==null?void 0:m.call(e);const l=e.fallback||e.placeholder;if(l)return l();const o=i.fallback||i.placeholder||"",g=i.fallbackTag||i.placeholderTag||"span";return v(g,s,o)}}}),te=""+new URL("mobile.9S7sboHz.jpg",import.meta.url).href,se=""+new URL("doger-desktop.n8T5WlF3.jpg",import.meta.url).href,M=X("skillsChart",()=>{const c=f(!1);return{visible:c,toggle:s=>{c.value=s}}});class k{constructor(e,s={}){a(this,"gl");a(this,"type");a(this,"buffer");a(this,"normalized",!1);Object.assign(this,s),this.gl=e,this.type=this.gl.getContext().FLOAT,this.buffer=this.gl.getContext().createBuffer(),this.update()}update(){if(this.values){const e=this.gl.getContext();e.bindBuffer(this.target,this.buffer),e.bufferData(this.target,this.values,e.STATIC_DRAW)}}attach(e,s){const n=this.gl.getContext(),i=n.getAttribLocation(s,e);return this.target===n.ARRAY_BUFFER&&(n.enableVertexAttribArray(i),n.vertexAttribPointer(i,this.size,this.type,this.normalized,0,0)),i}use(e){const s=this.gl.getContext();s.bindBuffer(this.target,this.buffer),this.target===s.ARRAY_BUFFER&&(s.enableVertexAttribArray(e),s.vertexAttribPointer(e,this.size,this.type,this.normalized,0,0))}}class ie{constructor(e,s,n,i={},l={}){a(this,"gl");a(this,"uniformInstances",[]);Object.assign(this,l),this.gl=e,this.uniforms=i;const o=this.gl.getContext(),g=`
            precision highp float;
        `;this.vertexSource=`
            ${g}
            attribute vec4 position;
            attribute vec2 uv;
            attribute vec2 uvNorm;
            ${this._getUniformVariableDeclarations(this.gl.commonUniforms,"vertex")}
            ${this._getUniformVariableDeclarations(i,"vertex")}
            ${s}
        `,this.Source=`
            ${g}
            ${this._getUniformVariableDeclarations(this.gl.commonUniforms,"fragment")}
            ${this._getUniformVariableDeclarations(i,"fragment")}
            ${n}
        `,this.vertexShader=this._getShaderByType(o.VERTEX_SHADER,this.vertexSource),this.fragmentShader=this._getShaderByType(o.FRAGMENT_SHADER,this.Source),this.program=o.createProgram(),o.attachShader(this.program,this.vertexShader),o.attachShader(this.program,this.fragmentShader),o.linkProgram(this.program),o.getProgramParameter(this.program,o.LINK_STATUS)||console.error(o.getProgramInfoLog(this.program)),o.useProgram(this.program),this.attachUniforms(void 0,this.gl.commonUniforms),this.attachUniforms(void 0,this.uniforms)}_getShaderByType(e,s){const n=this.gl.getContext(),i=n.createShader(e);return n.shaderSource(i,s),n.compileShader(i),n.getShaderParameter(i,n.COMPILE_STATUS)||console.error(n.getShaderInfoLog(i)),i}_getUniformVariableDeclarations(e,s){return Object.entries(e).map(([n,i])=>i.getDeclaration(n,s)).join(`
`)}attachUniforms(e,s){e?s.type==="array"?s.value.forEach((n,i)=>{this.attachUniforms(`${e}[${i}]`,n)}):s.type==="struct"?Object.entries(s.value).forEach(([n,i])=>{this.attachUniforms(`${e}.${n}`,i)}):this.uniformInstances.push({uniform:s,location:this.gl.getContext().getUniformLocation(this.program,e)}):Object.entries(s).forEach(([n,i])=>{this.attachUniforms(n,i)})}}class ne{constructor(e,s,n,i={}){a(this,"gl");a(this,"wireframe",!1);a(this,"attributeInstances",[]);Object.assign(this,i),this.geometry=s,this.material=n,this.gl=e,Object.entries(this.geometry.attributes).forEach(([l,o])=>{this.attributeInstances.push({attribute:o,location:o.attach(l,this.material.program)})}),this.gl.meshes.push(this)}draw(){const e=this.gl.getContext();e.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:n,location:i})=>{n.update(i)}),this.attributeInstances.forEach(({attribute:n,location:i})=>{n.use(i)});const s=this.wireframe?e.LINES:e.TRIANGLES;e.drawElements(s,this.geometry.attributes.index.values.length,e.UNSIGNED_SHORT,0)}remove(){this.gl.meshes=this.gl.meshes.filter(e=>e!=this)}}class oe{constructor(e,s,n,i,l,o,g={}){a(this,"gl");a(this,"attributes");Object.assign(this,g),this.gl=e;const m=this.gl.getContext();m.createBuffer(),this.attributes={position:new k(this.gl,{target:m.ARRAY_BUFFER,size:3}),uv:new k(this.gl,{target:m.ARRAY_BUFFER,size:2}),uvNorm:new k(this.gl,{target:m.ARRAY_BUFFER,size:2}),index:new k(this.gl,{target:m.ELEMENT_ARRAY_BUFFER,size:3,type:m.UNSIGNED_SHORT})},this.setTopology(i,l),this.setSize(s,n,o)}setTopology(e=1,s=1){this.xSegCount=e,this.ySegCount=s,this.vertexCount=(this.xSegCount+1)*(this.ySegCount+1),this.quadCount=this.xSegCount*this.ySegCount*2,this.attributes.uv.values=new Float32Array(2*this.vertexCount),this.attributes.uvNorm.values=new Float32Array(2*this.vertexCount),this.attributes.index.values=new Uint16Array(3*this.quadCount);for(let n=0;n<=this.ySegCount;n++)for(let i=0;i<=this.xSegCount;i++){const l=n*(this.xSegCount+1)+i;if(this.attributes.uv.values[2*l]=i/this.xSegCount,this.attributes.uv.values[2*l+1]=1-n/this.ySegCount,this.attributes.uvNorm.values[2*l]=i/this.xSegCount*2-1,this.attributes.uvNorm.values[2*l+1]=1-n/this.ySegCount*2,i<this.xSegCount&&n<this.ySegCount){const o=n*this.xSegCount+i;this.attributes.index.values[6*o]=l,this.attributes.index.values[6*o+1]=l+1+this.xSegCount,this.attributes.index.values[6*o+2]=l+1,this.attributes.index.values[6*o+3]=l+1,this.attributes.index.values[6*o+4]=l+1+this.xSegCount,this.attributes.index.values[6*o+5]=l+2+this.xSegCount}}this.attributes.uv.update(),this.attributes.uvNorm.update(),this.attributes.index.update()}setSize(e=1,s=1,n="xz"){this.width=e,this.height=s,this.orientation=n,this.attributes.position.values&&this.attributes.position.values.length===3*this.vertexCount||(this.attributes.position.values=new Float32Array(3*this.vertexCount));const i=e/-2,l=s/-2,o=e/this.xSegCount,g=s/this.ySegCount;for(let m=0;m<=this.ySegCount;m++){const x=l+m*g;for(let w=0;w<=this.xSegCount;w++){const F=i+w*o,S=m*(this.xSegCount+1)+w;this.attributes.position.values[3*S+"xyz".indexOf(n[0])]=F,this.attributes.position.values[3*S+"xyz".indexOf(n[1])]=-x}}this.attributes.position.update()}}class d{constructor(e,s,n,i={}){a(this,"gl");a(this,"type");a(this,"value");a(this,"typeFn");a(this,"_typeMap",{float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"});Object.assign(this,i),this.gl=e,this.type=s,this.value=n,this.typeFn=this._typeMap[this.type]||this._typeMap.float,this.update()}update(e){if(this.value){var s=this.value,n=null;this.typeFn.indexOf("Matrix")===0&&(s=this.transpose,n=this.value),this.gl.getContext()[`uniform${this.typeFn}`](e,s,n)}}getDeclaration(e,s,n){if(this.excludeFrom!==s){if(this.type==="array")return`${this.value[0].getDeclaration(e,s,this.value.length)}
const int ${e}_length = ${this.value.length};`;if(this.type==="struct"){let i=e.replace("u_","");i=i.charAt(0).toUpperCase()+i.slice(1);const l=Object.entries(this.value).map(([o,g])=>g.getDeclaration(o,s).replace(/^uniform/,"")).join("");return`uniform struct ${i} {
    ${l}
} ${e}${n>0?`[${n}]`:""};`}return`uniform ${this.type} ${e}${n>0?`[${n}]`:""};`}}}class P{constructor(e,s,n){a(this,"_class",P);a(this,"_canvas");a(this,"_context");a(this,"commonUniforms",{});a(this,"meshes",[]);this.setCanvas(e);const i=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];this.commonUniforms={projectionMatrix:new d(this,"mat4",i),modelViewMatrix:new d(this,"mat4",i),resolution:new d(this,"vec2",[1,1]),aspectRatio:new d(this,"float",1)},this.setSize(s,n)}setCanvas(e){this._canvas=e,this._context=e.getContext("webgl",{antialias:!0})}getCanvas(){return this._canvas}getContext(){return this._context}setSize(e=640,s=480){this.getCanvas().width=e,this.getCanvas().height=s,this.getContext().viewport(0,0,e,s),this.commonUniforms.resolution.value=[e,s],this.commonUniforms.aspectRatio.value=e/s}setOrthographicCamera(e=0,s=0,n=0,i=-2e3,l=2e3){this.commonUniforms.projectionMatrix.value=[2/this.getCanvas().width,0,0,0,0,2/this.getCanvas().height,0,0,0,0,2/(i-l),0,e,s,n,1]}render(){this.getContext().clearColor(0,0,0,0),this.getContext().clearDepth(1),this.meshes.forEach(e=>{e.draw()})}}const ae=`//
// https://github.com/jamieowen/glsl-blend
//

// Normal

vec3 blendNormal(vec3 base, vec3 blend) {
    return blend;
}

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
    return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
}

// Screen

float blendScreen(float base, float blend) {
    return 1.0-((1.0-base)*(1.0-blend));
}

vec3 blendScreen(vec3 base, vec3 blend) {
    return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));
}

vec3 blendScreen(vec3 base, vec3 blend, float opacity) {
    return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));
}

// Multiply

vec3 blendMultiply(vec3 base, vec3 blend) {
    return base*blend;
}

vec3 blendMultiply(vec3 base, vec3 blend, float opacity) {
    return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}

// Overlay

float blendOverlay(float base, float blend) {
    return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
    return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
}

vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
    return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}

// Hard light

vec3 blendHardLight(vec3 base, vec3 blend) {
    return blendOverlay(blend,base);
}

vec3 blendHardLight(vec3 base, vec3 blend, float opacity) {
    return (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Soft light

float blendSoftLight(float base, float blend) {
    return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
    return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
}

vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
    return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Color dodge

float blendColorDodge(float base, float blend) {
    return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 blendColorDodge(vec3 base, vec3 blend) {
    return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
}

vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
    return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Color burn

float blendColorBurn(float base, float blend) {
    return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

vec3 blendColorBurn(vec3 base, vec3 blend) {
    return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));
}

vec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {
    return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Vivid Light

float blendVividLight(float base, float blend) {
    return (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));
}

vec3 blendVividLight(vec3 base, vec3 blend) {
    return vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));
}

vec3 blendVividLight(vec3 base, vec3 blend, float opacity) {
    return (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Lighten

float blendLighten(float base, float blend) {
    return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
    return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
    return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear burn

float blendLinearBurn(float base, float blend) {
    // Note : Same implementation as BlendSubtractf
    return max(base+blend-1.0,0.0);
}

vec3 blendLinearBurn(vec3 base, vec3 blend) {
    // Note : Same implementation as BlendSubtract
    return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {
    return (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear dodge

float blendLinearDodge(float base, float blend) {
    // Note : Same implementation as BlendAddf
    return min(base+blend,1.0);
}

vec3 blendLinearDodge(vec3 base, vec3 blend) {
    // Note : Same implementation as BlendAdd
    return min(base+blend,vec3(1.0));
}

vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
    return (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear light

float blendLinearLight(float base, float blend) {
    return blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));
}

vec3 blendLinearLight(vec3 base, vec3 blend) {
    return vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));
}

vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
    return (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));
}
`,le=`varying vec3 v_color;

void main() {
    vec3 color = v_color;
    if (u_darken_top == 1.0) {
        vec2 st = gl_FragCoord.xy/resolution.xy;
        color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
    }
    gl_FragColor = vec4(color, 1.0);
}
`,re=`//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
{
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}
`,ce=`varying vec3 v_color;

void main() {
  float time = u_time * u_global.noiseSpeed;

  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;

  vec2 st = 1. - uvNorm.xy;

  //
  // Tilting the plane
  //

  // Front-to-back tilt
  float tilt = resolution.y / 2.0 * uvNorm.y;

  // Left-to-right angle
  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;

  // Up-down shift to offset incline
  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);

  //
  // Vertex noise
  //

  float noise = snoise(vec3(
    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,
    noiseCoord.y * u_vertDeform.noiseFreq.y,
    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed
  )) * u_vertDeform.noiseAmp;

  // Fade noise to zero at edges
  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);

  // Clamp to 0
  noise = max(0.0, noise);

  vec3 pos = vec3(
    position.x,
    position.y + tilt + incline + noise - offset,
    position.z
  );

  //
  // Vertex color, to be passed to fragment shader
  //

  if (u_active_colors[0] == 1.) {
    v_color = u_baseColor;
  }

  for (int i = 0; i < u_waveLayers_length; i++) {
    if (u_active_colors[i + 1] == 1.) {
      WaveLayers layer = u_waveLayers[i];

      float noise = smoothstep(
        layer.noiseFloor,
        layer.noiseCeil,
        snoise(vec3(
          noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,
          noiseCoord.y * layer.noiseFreq.y,
          time * layer.noiseSpeed + layer.noiseSeed
        )) / 2.0 + 0.5
      );

      v_color = blendNormal(v_color, layer.color, pow(noise, 4.));
    }
  }

  //
  // Finish
  //

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`,$=class ${constructor(e){a(this,"_class",$);a(this,"vertexShader",null);a(this,"uniforms",null);a(this,"time",1253106);a(this,"mesh",null);a(this,"material",null);a(this,"geometry",null);a(this,"scrollingTimeout",null);a(this,"scrollingRefreshDelay",200);a(this,"scrollObserver",null);a(this,"width",null);a(this,"minWidth",1111);a(this,"height",600);a(this,"xSegCount",null);a(this,"ySegCount",null);a(this,"freqX",14e-5);a(this,"freqY",29e-5);a(this,"freqDelta",1e-5);a(this,"activeColors",[1,1,1,1]);a(this,"shaderFiles",{vertex:ce,noise:re,blend:ae,fragment:le});a(this,"options",{});a(this,"_flags",{playing:!0});a(this,"_canvas");a(this,"_context");a(this,"_minigl");if(this.options=e,this.setCanvas(this.findCanvas(this.getOption("canvas"))),!this.getCanvas())throw"Missing Canvas. Pass the canvas to the Gradient constructor.";this._minigl=new P(this.getCanvas(),this.getCanvas().offsetWidth,this.getCanvas().offsetHeight),this.init()}getOption(e,s=void 0){return s===void 0&&e in this._class.defaultOptions&&(s=this._class.defaultOptions[e]),e in this.options?this.options[e]:s}findCanvas(e){const s=typeof e=="string"?document.querySelector(e):e;return s instanceof HTMLCanvasElement?s:null}setCanvas(e){e?(this._canvas=e,this._context=e.getContext("webgl",{antialias:!0})):(this._canvas=null,this._context=null)}getCanvas(){return this._canvas}getContext(){return this._context}setFlag(e,s){return this._flags[e]=s}getFlag(e,s=void 0){return this._flags[e]||s}handleScroll(){clearTimeout(this.scrollingTimeout),this.scrollingTimeout=setTimeout(this.handleScrollEnd,this.scrollingRefreshDelay),this.getFlag("playing")&&(this.setFlag("isScrolling",!0),this.pause())}handleScrollEnd(){this.setFlag("isScrolling",!1),this.getFlag("isIntersecting")&&this.play()}resize(){const[e,s]=this.getOption("density");this.width=window.innerWidth,this._minigl.setSize(this.width,this.height),this._minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*e),this.ySegCount=Math.ceil(this.height*s),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}animate(e=0){const s=!!window.document.hidden||!this.getFlag("playing")||parseInt(e,10)%2===0;let n=this.getFlag("lastFrame",0);if(s||(this.time+=Math.min(e-n,1e3/15),n=this.setFlag("lastFrame",e),this.mesh.material.uniforms.u_time.value=this.time,this._minigl.render()),n!==0&&this.getOption("static"))return this._minigl.render(),this.disconnect();this.getFlag("playing")&&requestAnimationFrame(this.animate.bind(this))}pause(){this.setFlag("playing",!1)}play(){requestAnimationFrame(this.animate.bind(this)),this.setFlag("playing",!0)}disconnect(){this.scrollObserver&&(window.removeEventListener("scroll",this.handleScroll),this.scrollObserver.disconnect()),window.removeEventListener("resize",this.resize)}initMaterial(){const e=this.getOption("colors").map(s=>(s.length===4&&(s=`#${s.substr(1).split("").map(i=>i+i).join("")}`),s&&`0x${s.substr(1)}`)).filter(Boolean).map(this.normalizeColor);this.uniforms={u_time:new d(this._minigl,"float",0),u_shadow_power:new d(this._minigl,"float",10),u_darken_top:new d(this._minigl,"float",this.getCanvas().dataset.jsDarkenTop?1:0),u_active_colors:new d(this._minigl,"vec4",this.activeColors),u_global:new d(this._minigl,"struct",{noiseFreq:new d(this._minigl,"vec2",[this.freqX,this.freqY]),noiseSpeed:new d(this._minigl,"float",5e-6)}),u_vertDeform:new d(this._minigl,"struct",{incline:new d(this._minigl,"float",Math.sin(this.getOption("angle"))/Math.cos(this.getOption("angle"))),offsetTop:new d(this._minigl,"float",-.5),offsetBottom:new d(this._minigl,"float",-.5),noiseFreq:new d(this._minigl,"vec2",[3,4]),noiseAmp:new d(this._minigl,"float",this.getOption("amplitude")),noiseSpeed:new d(this._minigl,"float",10),noiseFlow:new d(this._minigl,"float",3),noiseSeed:new d(this._minigl,"float",this.seed)},{excludeFrom:"fragment"}),u_baseColor:new d(this._minigl,"vec3",e[0],{excludeFrom:"fragment"}),u_waveLayers:new d(this._minigl,"array",[],{excludeFrom:"fragment"})};for(let s=1;s<e.length;s+=1){const n=new d(this._minigl,"struct",{color:new d(this._minigl,"vec3",e[s]),noiseFreq:new d(this._minigl,"vec2",[2+s/e.length,3+s/e.length]),noiseSpeed:new d(this._minigl,"float",11+.3*s),noiseFlow:new d(this._minigl,"float",6.5+.3*s),noiseSeed:new d(this._minigl,"float",this.seed+10*s),noiseFloor:new d(this._minigl,"float",.1),noiseCeil:new d(this._minigl,"float",.63+.07*s)});this.uniforms.u_waveLayers.value.push(n)}return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join(`

`),new ie(this._minigl,this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new oe(this._minigl),this.mesh=new ne(this._minigl,this.geometry,this.material),this.mesh.wireframe=this.getOption("wireframe")}updateFrequency(e){this.freqX+=e,this.freqY+=e}toggleColor(e){this.activeColors[e]=this.activeColors[e]===0?1:0}init(){const e=this.getOption("loadedClass");e&&this.getCanvas().classList.add(e),this.initMesh(),this.resize(),requestAnimationFrame(this.animate.bind(this)),window.addEventListener("resize",this.resize)}normalizeColor(e){return[(e>>16&255)/255,(e>>8&255)/255,(255&e)/255]}};a($,"defaultOptions",{canvas:null,colors:["#f00","#0f0","#00f"],wireframe:!1,density:[.06,.16],angle:0,amplitude:320,static:!1,loadedClass:"is-loaded",zoom:1,speed:5,rotation:0});let B=$;const de=c=>(Y("data-v-3cb77463"),c=c(),U(),c),he={class:"section__start section__wrapper"},me=j('<div class="section__background" data-v-3cb77463><canvas id="canvas" width="32px" height="32px" data-v-3cb77463></canvas></div><div class="mt-52 mx-auto container relative" data-v-3cb77463><h2 class="title--ultra-large title--condensed title--slide-from-bottom element--visible" style="mix-blend-mode:color-burn;opacity:0.6;" data-v-3cb77463><span data-v-3cb77463>Websites done <br data-v-3cb77463>the right way!</span></h2><h2 class="title--ultra-large title--condensed title--slide-from-bottom element--visible" style="position:absolute;top:0;left:0;opacity:0.4;" data-v-3cb77463><span data-v-3cb77463>Websites done <br data-v-3cb77463>the right way!</span></h2></div>',2),ue={class:"section__container section__container--small-padding-top flex gap-12"},ge={class:"w-full lg:w-1/2"},ve=de(()=>t("span",{style:{"transition-delay":".6s"}},[u(" I am a web developer based in Katowice, Poland. I specialise in building websites and web applications using modern technologies. "),t("br"),u(),t("br"),u("If you are a business seeking a web presence or an employer looking to hire, you can get in touch with me here. ")],-1)),pe=[ve],_e=j('<div class="hidden lg:block lg:w-1/2 relative" data-v-3cb77463><div class="box__rounded box--animated" data-v-3cb77463><h4 class="font-bold mb-4" data-v-3cb77463>Fully responsive design</h4><img src="'+te+'" alt="Fully responsive web design" width="260px" title="Fully responsive, mobile web design" data-v-3cb77463></div><div class="box__rounded box--bigger box--animated" data-v-3cb77463><img src="'+se+'" alt="Web application developed in laravel framework" width="450px" title="Web application developed in laravel framework" data-v-3cb77463></div></div>',1),be=y({__name:"Start",setup(c){const e=M(),s=C("onElementVisible"),n=()=>{z().visible=!0};return N(()=>{new B({canvas:"#canvas",colors:["#ff333d","#a960ee","#90e0ff","#ffcb57"]})}),(i,l)=>(p(),v("section",he,[me,t("div",ue,[t("div",ge,[t("p",{class:"leading-7 mt-4 title--slide-from-left",ref:r(s)},pe,512),t("div",{class:"title--slide-from-bottom flex gap-3",ref:r(s)},[t("button",{type:"button",class:"form__button form__button--arrow-right",onClick:b(n,["prevent"])}," Let's colaborate on a project "),t("button",{class:"form__button form__button--darker",onClick:l[0]||(l[0]=b(o=>r(e).toggle(!0),["prevent"]))}," Checkout my skills summary ")],512)]),_e])]))}}),fe=V(be,[["__scopeId","data-v-3cb77463"]]),ye={class:"section__wrapper"},xe={class:"section__container"},we=t("span",null,"Technologies I use in my projects",-1),Ce=[we],Se=t("span",{style:{"transition-delay":".6s"}},[u(" As a web developer, I have experience with a wide range of technologies. I have worked with Laravel, Vue.js, Nuxt 3, Tailwind CSS, and many other technologies. "),t("br"),u("I am always trying to gain new skills and improve my knowledge of the technologies I already know. Below you can find a list of the technologies I use in my projects everyday. If you are interested in working with me, feel free to contact me. I am always open to new opportunities. ")],-1),ke=[Se],Le={class:"technology__container mt-12"},$e={href:"https://github.com/lukasion/portfolio/tree/main",target:"_blank",class:"technology__item"},ze=t("p",{class:"technology__title"}," Checkout my work ",-1),Ee={href:"https://github.com/lukasion/portfolio/tree/main/laravel-api",target:"_blank",class:"technology__item",style:{"transition-delay":".6s"}},Me=t("p",{class:"technology__title"}," Checkout my work ",-1),Fe={class:"technology__item",style:{"transition-delay":".9s"}},Te={class:"technology__item",style:{"transition-delay":"1.2s"}},Ae={class:"technology__item",style:{"transition-delay":"1.5s"}},De={href:"https://github.com/lukasion/portfolio/tree/main",target:"_blank",class:"technology__item",style:{"transition-delay":"1.8s"}},Ie=t("p",{class:"technology__title"}," Checkout my work ",-1),Oe={href:"https://github.com/lukasion/portfolio/tree/main",target:"_blank",class:"technology__item",style:{"transition-delay":"2.1s"}},Be=t("p",{class:"technology__title"}," Checkout my work ",-1),Ne={href:"https://github.com/lukasion/portfolio/tree/main/laravel-api",target:"_blank",class:"technology__item",style:{"transition-delay":"2.4s"}},je=t("p",{class:"technology__title"}," Checkout my work ",-1),Ve={href:"https://github.com/lukasion/portfolio/tree/main/assets/scss",target:"_blank",class:"technology__item",style:{"transition-delay":"2.7s"}},Pe=t("p",{class:"technology__title"}," Checkout my work ",-1),Re={href:"https://github.com/lukasion/portfolio/tree/main/assets/scss",target:"_blank",class:"technology__item",style:{"transition-delay":"3.0s"}},Ye=t("p",{class:"technology__title"}," Checkout my work ",-1),Ue={class:"technology__item",style:{"transition-delay":"3.3s"}},qe={class:"technology__item",style:{"transition-delay":"3.6s"}},He={class:"technology__item",style:{"transition-delay":"3.9s"}},We=y({__name:"Technologies",setup(c){const e=C("onElementVisible");return(s,n)=>{const i=E;return p(),v("section",ye,[t("div",xe,[t("h2",{class:"title--x-large title--condensed title--slide-from-bottom",ref:r(e)},Ce,512),t("p",{class:"leading-7 mt-5 title--slide-from-left",ref:r(e)},ke,512),t("div",Le,[t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("a",$e,[t("div",null,[h(i,{name:"logos:vue",size:"48px"}),u(" Vue.js ")]),ze])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("a",Ee,[t("div",null,[h(i,{name:"logos:laravel",size:"48px"}),u(" Laravel ")]),Me])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("span",Fe,[t("div",null,[h(i,{name:"devicon:livewire",size:"48px"}),u(" Livewire ")])])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("span",Te,[t("div",null,[h(i,{name:"logos:alpinejs-icon",size:"48px"}),u(" Alpine.js ")])])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("span",Ae,[t("div",null,[h(i,{name:"logos:react",size:"48px"}),u(" React ")])])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("a",De,[t("div",null,[h(i,{name:"logos:nuxt-icon",size:"48px"}),u(" Nuxt ")]),Ie])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("a",Oe,[t("div",null,[h(i,{name:"logos:nodejs",size:"48px"}),u(" Node.js ")]),Be])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("a",Ne,[t("div",null,[h(i,{name:"logos:php-alt",size:"48px"}),u(" PHP ")]),je])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("a",Ve,[t("div",null,[h(i,{name:"vscode-icons:file-type-scss2",size:"48px"}),u(" SCSS ")]),Pe])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("a",Re,[t("div",null,[h(i,{name:"logos:tailwindcss-icon",size:"48px"}),u(" Tailwind ")]),Ye])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("span",Ue,[t("div",null,[h(i,{name:"logos:docker-icon",size:"48px"}),u(" Docker ")])])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("span",qe,[t("div",null,[h(i,{name:"logos:git",size:"48px"}),u(" Git ")])])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("span",He,[t("div",null,[h(i,{name:"logos:github-copilot",size:"48px"}),u(" GitHub Copilot ")])])],512)])])])}}});class _{constructor(e,s={}){if(!(e instanceof Node))throw"Can't initialize VanillaTilt because "+e+" is not a Node.";this.width=null,this.height=null,this.clientWidth=null,this.clientHeight=null,this.left=null,this.top=null,this.gammazero=null,this.betazero=null,this.lastgammazero=null,this.lastbetazero=null,this.transitionTimeout=null,this.updateCall=null,this.event=null,this.updateBind=this.update.bind(this),this.resetBind=this.reset.bind(this),this.element=e,this.settings=this.extendSettings(s),this.reverse=this.settings.reverse?-1:1,this.resetToStart=_.isSettingTrue(this.settings["reset-to-start"]),this.glare=_.isSettingTrue(this.settings.glare),this.glarePrerender=_.isSettingTrue(this.settings["glare-prerender"]),this.fullPageListening=_.isSettingTrue(this.settings["full-page-listening"]),this.gyroscope=_.isSettingTrue(this.settings.gyroscope),this.gyroscopeSamples=this.settings.gyroscopeSamples,this.elementListener=this.getElementListener(),this.glare&&this.prepareGlare(),this.fullPageListening&&this.updateClientSize(),this.addEventListeners(),this.reset(),this.resetToStart===!1&&(this.settings.startX=0,this.settings.startY=0)}static isSettingTrue(e){return e===""||e===!0||e===1}getElementListener(){if(this.fullPageListening)return window.document;if(typeof this.settings["mouse-event-element"]=="string"){const e=document.querySelector(this.settings["mouse-event-element"]);if(e)return e}return this.settings["mouse-event-element"]instanceof Node?this.settings["mouse-event-element"]:this.element}addEventListeners(){this.onMouseEnterBind=this.onMouseEnter.bind(this),this.onMouseMoveBind=this.onMouseMove.bind(this),this.onMouseLeaveBind=this.onMouseLeave.bind(this),this.onWindowResizeBind=this.onWindowResize.bind(this),this.onDeviceOrientationBind=this.onDeviceOrientation.bind(this),this.elementListener.addEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.addEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.addEventListener("mousemove",this.onMouseMoveBind),(this.glare||this.fullPageListening)&&window.addEventListener("resize",this.onWindowResizeBind),this.gyroscope&&window.addEventListener("deviceorientation",this.onDeviceOrientationBind)}removeEventListeners(){this.elementListener.removeEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.removeEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.removeEventListener("mousemove",this.onMouseMoveBind),this.gyroscope&&window.removeEventListener("deviceorientation",this.onDeviceOrientationBind),(this.glare||this.fullPageListening)&&window.removeEventListener("resize",this.onWindowResizeBind)}destroy(){clearTimeout(this.transitionTimeout),this.updateCall!==null&&cancelAnimationFrame(this.updateCall),this.element.style.willChange="",this.element.style.transition="",this.element.style.transform="",this.resetGlare(),this.removeEventListeners(),this.element.vanillaTilt=null,delete this.element.vanillaTilt,this.element=null}onDeviceOrientation(e){if(e.gamma===null||e.beta===null)return;this.updateElementPosition(),this.gyroscopeSamples>0&&(this.lastgammazero=this.gammazero,this.lastbetazero=this.betazero,this.gammazero===null?(this.gammazero=e.gamma,this.betazero=e.beta):(this.gammazero=(e.gamma+this.lastgammazero)/2,this.betazero=(e.beta+this.lastbetazero)/2),this.gyroscopeSamples-=1);const s=this.settings.gyroscopeMaxAngleX-this.settings.gyroscopeMinAngleX,n=this.settings.gyroscopeMaxAngleY-this.settings.gyroscopeMinAngleY,i=s/this.width,l=n/this.height,o=e.gamma-(this.settings.gyroscopeMinAngleX+this.gammazero),g=e.beta-(this.settings.gyroscopeMinAngleY+this.betazero),m=o/i,x=g/l;this.updateCall!==null&&cancelAnimationFrame(this.updateCall),this.event={clientX:m+this.left,clientY:x+this.top},this.updateCall=requestAnimationFrame(this.updateBind)}onMouseEnter(){this.updateElementPosition(),this.element.style.willChange="transform",this.setTransition()}onMouseMove(e){this.updateCall!==null&&cancelAnimationFrame(this.updateCall),this.event=e,this.updateCall=requestAnimationFrame(this.updateBind)}onMouseLeave(){this.setTransition(),this.settings.reset&&requestAnimationFrame(this.resetBind)}reset(){this.onMouseEnter(),this.fullPageListening?this.event={clientX:(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.clientWidth,clientY:(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.clientHeight}:this.event={clientX:this.left+(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.width,clientY:this.top+(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.height};let e=this.settings.scale;this.settings.scale=1,this.update(),this.settings.scale=e,this.resetGlare()}resetGlare(){this.glare&&(this.glareElement.style.transform="rotate(180deg) translate(-50%, -50%)",this.glareElement.style.opacity="0")}getValues(){let e,s;this.fullPageListening?(e=this.event.clientX/this.clientWidth,s=this.event.clientY/this.clientHeight):(e=(this.event.clientX-this.left)/this.width,s=(this.event.clientY-this.top)/this.height),e=Math.min(Math.max(e,0),1),s=Math.min(Math.max(s,0),1);let n=(this.reverse*(this.settings.max-e*this.settings.max*2)).toFixed(2),i=(this.reverse*(s*this.settings.max*2-this.settings.max)).toFixed(2),l=Math.atan2(this.event.clientX-(this.left+this.width/2),-(this.event.clientY-(this.top+this.height/2)))*(180/Math.PI);return{tiltX:n,tiltY:i,percentageX:e*100,percentageY:s*100,angle:l}}updateElementPosition(){let e=this.element.getBoundingClientRect();this.width=this.element.offsetWidth,this.height=this.element.offsetHeight,this.left=e.left,this.top=e.top}update(){let e=this.getValues();this.element.style.transform="perspective("+this.settings.perspective+"px) rotateX("+(this.settings.axis==="x"?0:e.tiltY)+"deg) rotateY("+(this.settings.axis==="y"?0:e.tiltX)+"deg) scale3d("+this.settings.scale+", "+this.settings.scale+", "+this.settings.scale+")",this.glare&&(this.glareElement.style.transform=`rotate(${e.angle}deg) translate(-50%, -50%)`,this.glareElement.style.opacity=`${e.percentageY*this.settings["max-glare"]/100}`),this.element.dispatchEvent(new CustomEvent("tiltChange",{detail:e})),this.updateCall=null}prepareGlare(){if(!this.glarePrerender){const e=document.createElement("div");e.classList.add("js-tilt-glare");const s=document.createElement("div");s.classList.add("js-tilt-glare-inner"),e.appendChild(s),this.element.appendChild(e)}this.glareElementWrapper=this.element.querySelector(".js-tilt-glare"),this.glareElement=this.element.querySelector(".js-tilt-glare-inner"),!this.glarePrerender&&(Object.assign(this.glareElementWrapper.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden","pointer-events":"none","border-radius":"inherit"}),Object.assign(this.glareElement.style,{position:"absolute",top:"50%",left:"50%","pointer-events":"none","background-image":"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",transform:"rotate(180deg) translate(-50%, -50%)","transform-origin":"0% 0%",opacity:"0"}),this.updateGlareSize())}updateGlareSize(){if(this.glare){const e=(this.element.offsetWidth>this.element.offsetHeight?this.element.offsetWidth:this.element.offsetHeight)*2;Object.assign(this.glareElement.style,{width:`${e}px`,height:`${e}px`})}}updateClientSize(){this.clientWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,this.clientHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}onWindowResize(){this.updateGlareSize(),this.updateClientSize()}setTransition(){clearTimeout(this.transitionTimeout),this.element.style.transition=this.settings.speed+"ms "+this.settings.easing,this.glare&&(this.glareElement.style.transition=`opacity ${this.settings.speed}ms ${this.settings.easing}`),this.transitionTimeout=setTimeout(()=>{this.element.style.transition="",this.glare&&(this.glareElement.style.transition="")},this.settings.speed)}extendSettings(e){let s={reverse:!1,max:15,startX:0,startY:0,perspective:1e3,easing:"cubic-bezier(.03,.98,.52,.99)",scale:1,speed:300,transition:!0,axis:null,glare:!1,"max-glare":1,"glare-prerender":!1,"full-page-listening":!1,"mouse-event-element":null,reset:!0,"reset-to-start":!0,gyroscope:!0,gyroscopeMinAngleX:-45,gyroscopeMaxAngleX:45,gyroscopeMinAngleY:-45,gyroscopeMaxAngleY:45,gyroscopeSamples:10},n={};for(var i in s)if(i in e)n[i]=e[i];else if(this.element.hasAttribute("data-tilt-"+i)){let l=this.element.getAttribute("data-tilt-"+i);try{n[i]=JSON.parse(l)}catch{n[i]=l}}else n[i]=s[i];return n}static init(e,s){e instanceof Node&&(e=[e]),e instanceof NodeList&&(e=[].slice.call(e)),e instanceof Array&&e.forEach(n=>{"vanillaTilt"in n||(n.vanillaTilt=new _(n,s))})}}typeof document<"u"&&(window.VanillaTilt=_,_.init(document.querySelectorAll("[data-tilt]")));const Ge=_,Xe={class:"section__dark section__wrapper"},Qe={class:"section__container"},Je=t("h2",{class:"title--x-large title--condensed"},"What can I offer?",-1),Ke={class:"collab__background"},Ze={class:"collab__content"},et=t("h2",{class:"title--large title--condensed"},"Websites",-1),tt=t("p",null," The websites I build are fast, secure and easy to manage. I use the latest technologies to ensure your website is future-proof and scalable. ",-1),st=t("div",{class:"collab__box collab__box--empty"},null,-1),it={class:"collab__background collab__background--on-demand"},nt={class:"collab__content"},ot=t("h2",{class:"title--large title--condensed"},"On-demand programming",-1),at=t("p",null," Do you need a custom solution for your business? I can build a web application tailored to your needs. I can also help you with your existing project. ",-1),lt=t("div",{class:"collab__box collab__box--empty"},null,-1),rt={class:"collab__background collab__background--seo"},ct={class:"collab__content"},dt=t("h2",{class:"title--large title--condensed"},"SEO",-1),ht=t("p",null," Search Engine Optimisation is a crucial part of any website. I can help you improve your website's ranking in search engines. ",-1),mt=t("div",{class:"collab__box collab__box--empty"},null,-1),ut=y({__name:"Collab",setup(c){const e=C("onElementVisible"),s=()=>{z().visible=!0},n=f([]),i=l=>{n.value.push(l)};return N(()=>{Ge.init(n.value,{speed:200,glare:!0,"max-glare":.2,gyroscope:!1,perspective:700,scale:1.05})}),(l,o)=>(p(),v("div",Xe,[t("div",Qe,[Je,t("div",{class:"collab__container",ref:r(e)},[t("div",{class:"collab__box",ref:i},[t("div",Ke,[t("div",Ze,[et,tt,t("a",{class:"mt-5 block hover:underline hover:cursor-pointer",onClick:b(s,["prevent"])}," Create a website ")])])]),st,t("div",{class:"collab__box",ref:i},[t("div",it,[t("div",nt,[ot,at,t("a",{class:"mt-5 block hover:underline hover:cursor-pointer",onClick:b(s,["prevent"])}," Maintain an existing project ")])])])],512),t("div",{class:"collab__container md:!mt-16",ref:r(e)},[lt,t("div",{class:"collab__box",ref:i},[t("div",rt,[t("div",ct,[dt,ht,t("a",{class:"mt-5 block hover:underline hover:cursor-pointer",onClick:b(s,["prevent"])}," Rank up my webpage ")])])]),mt],512)])]))}}),gt={class:"section__wrapper"},vt={class:"section__container"},pt=t("span",null,"You can find me also here",-1),_t=[pt],bt=t("span",{style:{"transition-delay":".6s"}}," I am active on many social media platforms. You can find me primarily on GitHub, and LinkedIn. I am also available via email. If you want to get in touch with me, feel free to contact me on any of the platforms listed below. ",-1),ft=[bt],yt={class:"technology__container mt-12"},xt={class:"technology__item"},wt={class:"technology__item",style:{"transition-delay":"0.6s"}},Ct={class:"technology__item",style:{"transition-delay":"0.9s"}},St={class:"technology__item",style:{"transition-delay":"1.2s"}},kt=y({__name:"Socials",setup(c){const e=C("onElementVisible");return(s,n)=>{const i=E;return p(),v("section",gt,[t("div",vt,[t("h2",{class:"title--x-large title--condensed title--slide-from-bottom",ref:r(e)},_t,512),t("p",{class:"leading-7 mt-5 title--slide-from-left",ref:r(e)},ft,512),t("div",yt,[t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("span",xt,[t("div",null,[h(i,{name:"logos:github-icon",size:"48px"}),u(" GitHub ")])])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("span",wt,[t("div",null,[h(i,{name:"logos:linkedin-icon",size:"48px"}),u(" LinkedIn ")])])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("span",Ct,[t("div",null,[h(i,{name:"logos:facebook",size:"48px"}),u(" Facebook ")])])],512),t("div",{class:"technology__item-wrapper title--slide-from-bottom",ref:r(e)},[t("span",St,[t("div",null,[h(i,{name:"logos:google-gmail",size:"48px"}),u(" Google Mail ")])])],512)])])])}}}),Lt=window.setInterval,$t={class:"section__container"},zt=t("span",null,"About me",-1),Et=[zt],Mt={key:0,class:"code__preloader"},Ft={key:1,class:"code__container"},Tt=j('<div data-line-nr="01" class="code__line"><div class="methods">class</div><span class="propname">Łukasz Fujarski</span><div class="methods">extends</div><div class="propname">Developer</div> { </div><div data-line-nr="02" class="code__line"><div class="dot">··</div><div class="comment"> // &quot;Don&#39;t comment bad code – rewrite it.&quot; - Brian Kernighan. </div></div><div data-line-nr="03" class="code__line"><div class="dot">··</div><div class="comment"> // &quot;Give someone a program; you frustrate them for a day; teach them how to program, and you frustrate them for a lifetime&quot; – David Leinweber. </div></div><div data-line-nr="04" class="code__line"></div><div data-line-nr="05" class="code__line"><div class="dot">··</div><div class="propname"><div class="methods">public string </div><span class="variable">$name</span><span class="methods">;</span></div></div><div data-line-nr="06" class="code__line"><div class="dot">··</div><div class="propname"><div class="methods">public string </div><span class="variable">$email</span><span class="methods">;</span></div></div><div data-line-nr="07" class="code__line"><div class="dot">··</div><div class="propname"><div class="methods">private string </div><span class="variable">$dayOfBirthTimestamp</span><span class="methods">;</span></div></div><div data-line-nr="08" class="code__line"></div><div data-line-nr="09" class="code__line"><div class="dot">··</div><div class="propname"><div class="methods">public function </div><span class="methodname">__construct</span>() </div></div><div data-line-nr="10" class="code__line"><div class="dot">··</div><div class="propname"> { </div></div><div data-line-nr="11" class="code__line"><div class="dot">·....·</div><span class="variable">$this<span class="arrow">-&gt;</span>name</span>                = <span class="string">&#39;Łukasz Fujarski&#39;;</span></div><div data-line-nr="12" class="code__line"><div class="dot">·....·</div><span class="variable">$this<span class="arrow">-&gt;</span>email</span>               = <span class="string">&#39;lukasz.fujarski@gmail.com&#39;;</span></div><div data-line-nr="13" class="code__line"><div class="dot">·....·</div><span class="variable">$this<span class="arrow">-&gt;</span>dayOfBirthTimestamp</span> = <span class="string">856059633;</span></div><div data-line-nr="14" class="code__line"><div class="dot">··</div><div class="propname"> } </div></div><div data-line-nr="15" class="code__line"></div><div data-line-nr="16" class="code__line"><div class="dot">··</div><div class="propname"><div class="methods">public function </div><span class="methodname">workExperience</span>(): <span class="methods">array</span></div></div><div data-line-nr="17" class="code__line"><div class="dot">··</div><div class="propname"> { </div></div><div data-line-nr="18" class="code__line"><div class="dot">······</div><div class="methods">return</div> [ </div><div data-line-nr="19" class="code__line"><div class="dot">······</div><div>     &#39;2022 - now&#39; =&gt; &#39;Full Stack Developer at <a href="https://tech-studio.pl/" target="_blank">Tech-Studio S.C.</a>&#39;, </div></div><div data-line-nr="20" class="code__line"><div class="dot">······</div><div>     &#39;2018 - 2022&#39; =&gt; &#39;PHP Developer at <a href="https://tech-studio.pl/" target="_blank">Tech-Studio S.C.</a>&#39; </div></div><div data-line-nr="21" class="code__line"><div class="dot">······</div><div> ]; </div></div><div data-line-nr="22" class="code__line"><div class="dot">··</div><div class="propname"> } </div></div><div data-line-nr="23" class="code__line"></div><div data-line-nr="24" class="code__line"><div class="dot">··</div><div class="propname"><div class="methods">public function </div><span class="methodname lg:tooltip" data-tip="Method defines only few of the technologies I&#39;ve worked with. Through the time working as web developer I&#39;ve gained experience in many more programming languages, frameworks and tools.">skills</span>(): <span class="methods">array</span></div></div><div data-line-nr="25" class="code__line"><div class="dot">··</div><div class="propname"> { </div></div><div data-line-nr="26" class="code__line"><div class="dot">······</div><div class="methods">return</div> [&#39;JavaScript&#39;, &#39;PHP&#39;, &#39;CSS&#39;, &#39;Laravel Framework&#39;, &#39;SCSS&#39;, &#39;Vue.js 2 &amp; 3&#39;, &#39;Nuxt.js&#39;, &#39;Tailwind CSS&#39;, &#39;Git&#39;, &#39;MySQL&#39;, &#39;Docker&#39;, &#39;Linux&#39;, &#39;Apache&#39;, &#39;Webpack&#39;, &#39;Composer&#39;, &#39;NPM&#39;, &#39;Node.js&#39;, &#39;Adobe Photoshop&#39;, &#39;Microsoft Office&#39;, &#39;Microsoft Excel&#39;, &#39;Microsoft SQL Server&#39;, &#39;Microsoft Power BI&#39;, &#39;Pinia&#39;, &#39;Vuex&#39;, &#39;Vuetify&#39;, &#39;Bootstrap&#39;, &#39;jQuery&#39;, &#39;HTML&#39;, &#39;REST API&#39;, &#39;Python&#39;, &#39;C#&#39;]; </div><div data-line-nr="27" class="code__line"><div class="dot">··</div><div class="propname"> } </div></div><div data-line-nr="28" class="code__line"><div class="propname"> } </div></div>',28),At=[Tt],Dt={__name:"Code",setup(c){const e=f(!0),s=f("..."),n=f(null),i=C("onElementVisible"),l=M();return Q(n,([{isIntersecting:g}],m)=>{g&&(n.value&&m.unobserve(n.value),setTimeout(()=>{e.value=!1},4e3),Lt(()=>{s.value==="..."?s.value="":s.value+="."},300))}),(g,m)=>(p(),v("div",null,[t("div",$t,[t("h2",{class:"title--x-large title--condensed",ref:r(i)},Et,512),t("button",{class:"form__button form__button--dark",onClick:m[0]||(m[0]=b(x=>r(l).toggle(!0),["prevent"]))}," Checkout my skills chart ")]),t("div",{class:"code",ref_key:"editor",ref:n},[r(e)?(p(),v("div",Mt,[u(" LOADING ENVIRONMENT "),t("span",null,L(r(s)),1)])):(p(),v("div",Ft,At))],512)]))}},It=Dt,Ot={class:"modal"},Bt={class:"modal__container"},Nt={class:"modal__content"},jt=t("div",{class:"modal__header"},[t("h2",{class:"title--x-large title--condensed"},[t("span",null,"Get in touch with me")]),t("p",{class:"leading-7 mt-5"},[t("span",{style:{"transition-delay":".6s"}}," You can contact me via email, or by filling out the form below. I will try to respond as soon as possible. ")])],-1),Vt={class:"modal__form"},Pt={action:""},Rt={class:"form__input-container"},Yt={class:"form__input-container"},Ut={class:"form__input-container"},qt={class:"modal__form-input"},Ht=y({__name:"Contact",setup(c){const e=z(),s=f({name:"",email:"",message:""});return(n,i)=>{const l=E;return p(),v("div",Ot,[t("div",Bt,[t("button",{class:"modal__close",onClick:i[0]||(i[0]=b(o=>r(e).visible=!1,["prevent"]))},[h(l,{name:"material-symbols:close-small",class:"w-15 h-15 text-5xl"})]),t("div",Nt,[jt,t("div",Vt,[t("form",Pt,[t("div",Rt,[T(t("input",{class:"form__input",t:"",type:"text",id:"name",placeholder:"Your name","onUpdate:modelValue":i[1]||(i[1]=o=>r(s).name=o)},null,512),[[A,r(s).name]])]),t("div",Yt,[T(t("input",{class:"form__input",type:"email",id:"email",placeholder:"Your e-mail address","onUpdate:modelValue":i[2]||(i[2]=o=>r(s).email=o)},null,512),[[A,r(s).email]])]),t("div",Ut,[T(t("textarea",{class:"form__input",id:"message",placeholder:"Your message","onUpdate:modelValue":i[3]||(i[3]=o=>r(s).message=o)},null,512),[[A,r(s).message]])]),t("div",qt,[t("button",{onClick:i[4]||(i[4]=b(o=>r(e).submit(r(s)),["prevent"])),class:"form__button form__button--dark"}," Contact request ")])])])])])])}}}),R=c=>(Y("data-v-96178cac"),c=c(),U(),c),Wt={class:"skills-chart__container"},Gt={class:"skills-chart__content"},Xt=R(()=>t("h2",{class:"title--x-large title--condensed"},[t("span",null,"My skills summary")],-1)),Qt=R(()=>t("p",{class:"leading-7 mt-5"},[t("span",{style:{"transition-delay":".6s"}}," Here you can see my skills chart. I have divided my skills into three categories: frontend, backend, and other. You can see the percentage of my skills in each category. ")],-1)),Jt={class:"title--large mt-10 mb-4"},Kt={class:"w-full shadow-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden"},Zt=R(()=>t("thead",{class:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"},[t("tr",null,[t("th",{class:"px-6 py-3"},"Technologies"),t("th",{class:"px-6 py-3"},"Features")])],-1)),es={class:"bg-white border-b dark:bg-gray-800 dark:border-gray-700"},ts={class:"px-6 py-4"},ss={class:"px-6 py-4"},is={class:"flex flex-wrap gap-1 gap-y-3"},ns={class:"badge"},os={__name:"SkillsChart",setup(c){const e=M(),s=f([{name:"Frontend",technologies:[{name:"Vue.js",features:["Vue 2","Vue 3","Composition API","Options API","Vuex Store","Vue Router","Pinia","Vite","Webpack","Quasar","Vuetfy","VCalendar","VueUse"]},{name:"Nuxt.js",features:["Nuxt 3","Nuxt Mapbox","Nuxt Mail","Nuxt Icon","Sidebase/Nuxt Auth"]},{name:"Others",features:["Tailwind CSS","Alpine.js","Bootstrap","jQuery"]}]},{name:"Backend",technologies:[{name:"Laravel",features:["Laravel 7-10","Livewire","Sanctum","Sail","Spatie","Passport","Tinker","Mix","Homestead","Sail","Queues","Jobs","MVC","Migrations & Seeders","Requests","Cache","Mails","Broadcasts","Notifications","Task Scheduling","Hashing"]},{name:"Livewire",features:["Livewire 3"]},{name:"Symfony",features:["Twig","Doctrine","Console","Forms","Routing","Validator","Yaml"]},{name:"Node.js",features:["Express.js","Sequelize","REST API","NPM","PM2","Nodemon","Puppeteer","OpenAI","GCloud"]}]},{name:"Other",technologies:[{name:"Git",features:["GitHub","Git CLI","Github Copilot"]},{name:"Docker",features:["Docker Compose","Docker Hub","Docker Desktop","Docker CLI","Dockerfile"]},{name:"Linux",features:["Ubuntu","Debian","Fedora"]},{name:"Apache",features:["Virtual Hosts","Modules","Configuration"]}]}]);return(n,i)=>{const l=E;return p(),v("div",{class:O(["skills-chart",{active:r(e).visible}])},[t("div",Wt,[t("button",{class:"skills-chart__close",onClick:i[0]||(i[0]=b(o=>r(e).toggle(!1),["prevent"]))},[h(l,{name:"material-symbols:close-small",class:"w-15 h-15 text-5xl"})]),t("div",Gt,[Xt,Qt,(p(!0),v(D,null,I(r(s),o=>(p(),v("div",null,[t("h3",Jt,L(o.name),1),t("table",Kt,[Zt,(p(!0),v(D,null,I(o.technologies,g=>(p(),v("tbody",null,[t("tr",es,[t("td",ts,L(g.name),1),t("td",ss,[t("div",is,[(p(!0),v(D,null,I(g.features,m=>(p(),v("div",ns,L(m),1))),256))])])])]))),256))])]))),256))])])],2)}}},as=V(os,[["__scopeId","data-v-96178cac"]]),ls={class:"app__container"},rs=y({__name:"index",setup(c){const e=z(),s=M();return(n,i)=>{const l=W,o=fe,g=We,m=ut,x=ee,w=kt,F=It,S=Ht;return p(),v("div",ls,[t("div",{class:O(["app__main",{"app__main--offseted":r(s).visible}])},[h(l),h(o),h(g),h(x,null,{default:J(()=>[h(m)]),_:1}),h(w),h(F),h(K)],2),h(S,{class:O({active:r(e).visible})},null,8,["class"]),h(as)])}}}),_s=V(rs,[["__scopeId","data-v-a64f2a4e"]]);export{_s as default};
