with import <nixpkgs> {};
mkShell {
    buildInputs = [
        terraform
        nodejs-18_x
    ];
}