function(doc) {
  if(doc.random) {
    emit(doc.random, doc);
  }
}