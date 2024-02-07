#include "fibonacci.h"

#include <string>

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;
#endif

std::string sayHello(std::string name)
{
    return "Hello, " + name;
}

#ifdef __EMSCRIPTEN__
// Symbols are exposed by embind to the Emscripten Module object in javascript
EMSCRIPTEN_BINDINGS(Fibonnaci)
{
    function("fib", &fib);
    function("sayHello", &sayHello);
}
#else
// Only used for code coverage
int main(int argc, char **argv) {}
#endif
