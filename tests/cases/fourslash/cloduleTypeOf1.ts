/// <reference path='fourslash.ts'/>

////class C<T> {
////    static foo(x: number) { }
////    x: T;
////}
////
////module C {
////    export function f(x: typeof C) {
////        x./*1*/
////        var /*3*/r = new /*2*/x<number>();
////        var /*5*/r2 = r./*4*/
////        return typeof r;
////    }
////}

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');


goTo.marker('1');
verify.completionListContains('f');
verify.completionListContains('foo');
edit.insert('foo(1);');

goTo.marker('2');
verify.completionListContains('x');

goTo.marker('3');
verify.quickInfoIs('(local var) r: C<number>');

goTo.marker('4');
verify.completionListContains('x');
edit.insert('x;');

goTo.marker('5');
verify.quickInfoIs('(local var) r2: number');

verify.numberOfErrorsInCurrentFile(0);