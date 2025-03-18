uniform float uTime;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;
uniform float uWarpPositionFrequency;
uniform float uWarpTimeFrequency;
uniform float uWarpStrength;

attribute vec4 tangent;

varying float vWobble;

#include ../includes/simplexNoise4d.glsl

float getWobble(vec3 position) {
    // Reduce the impact of mouse factor
    float uMouseFactor = 0.2; // Much smaller base interaction
    
    // Warp position with noise, incorporating mouse interaction
    vec3 warpedPosition = position + simplexNoise4d(vec4(
        position * (uWarpPositionFrequency * (1.0 - uMouseFactor * 0.5)), 
        uTime * (uWarpTimeFrequency * (1.0 + uMouseFactor * 0.1))
    )) * uWarpStrength;
    
    // Original noise-based wobble with subtle mouse interaction
    float noiseWobble = simplexNoise4d(vec4(
        warpedPosition * (uPositionFrequency * (1.0 - uMouseFactor * 0.5)),
        uTime * (uTimeFrequency * (1.0 + uMouseFactor * 0.1))
    )) * uStrength;
    
    // Sine-based wave effect with subtle mouse interaction
    float waveWobble = sin(position.x * (uPositionFrequency * (1.0 - uMouseFactor * 0.5)) + uTime * (uTimeFrequency * (1.0 + uMouseFactor * 0.1)))
                     + cos(position.y * (uPositionFrequency * (1.0 - uMouseFactor * 0.5)) + uTime * (uTimeFrequency * (1.0 + uMouseFactor * 0.1)));
    
    waveWobble *= (uStrength * 0.5 * (1.0 - uMouseFactor * 0.5)); // Modulate wave intensity
    
    return noiseWobble + waveWobble; // Combine noise and wave effects
}

void main() {
    vec3 biTangent = cross(normal, tangent.xyz);
    
    // Neighbours positions
    float shift = 0.01;
    vec3 positionA = csm_Position + (tangent.xyz + normal * 0.02) * shift;
    vec3 positionB = csm_Position + (biTangent + normal * 0.02) * shift;
    
    // Wobble
    float wobble = getWobble(csm_Position);
    csm_Position += wobble * normal;
    positionA += getWobble(positionA) * normal;
    positionB += getWobble(positionB) * normal;
    
    // Compute normal
    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);
    csm_Normal = cross(toA, toB);
    
    // Varying
    vWobble = wobble / uStrength;
}