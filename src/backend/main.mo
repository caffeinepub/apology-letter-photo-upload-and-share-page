import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  include MixinStorage();

  type ApologyLetter = {
    id : Text;
    blob : Storage.ExternalBlob;
    name : Text;
  };

  let apologyLetters = Map.empty<Text, ApologyLetter>();

  public shared ({ caller }) func uploadApologyLetter(blob : Storage.ExternalBlob, name : Text) : async Text {
    let id = name;
    let apologyLetter = {
      id;
      blob;
      name;
    };
    apologyLetters.add(id, apologyLetter);
    id;
  };

  public query ({ caller }) func getApologyLetter(id : Text) : async ApologyLetter {
    switch (apologyLetters.get(id)) {
      case (null) { Runtime.trap("Apology letter with this id does not exist") };
      case (?apologyLetter) { apologyLetter };
    };
  };

  public query ({ caller }) func getAllApologyLetters() : async [ApologyLetter] {
    apologyLetters.values().toArray();
  };
};
