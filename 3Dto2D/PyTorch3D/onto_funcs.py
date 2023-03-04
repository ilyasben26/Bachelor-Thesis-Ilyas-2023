from owlready2 import *
import torch
import clip
from PIL import Image


#ontology = get_ontology("file://C:/Users/Ilyas/Desktop/Bachelor Thesis/MyOntologies/transportation.owl").load()

def fetch_ontology(path):
    return get_ontology("file://"+path).load()

def image_to_probs(file_path, classes_strings):
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model, preprocess = clip.load("ViT-B/32", device=device)
    
    image = preprocess(Image.open(file_path)).unsqueeze(0).to(device)
    text = clip.tokenize(classes_strings).to(device)

    with torch.no_grad():
        image_features = model.encode_image(image)
        text_features = model.encode_text(text)
    
        logits_per_image, logits_per_text = model(image, text)
        probs = logits_per_image.softmax(dim=-1).cpu().numpy()
    
    return probs


def find_root_classes(ontology):
    # find one class that has owl.Thing as a parent 
    for OntoClass in ontology.classes():
        if(OntoClass.is_a[0].iri == "http://www.w3.org/2002/07/owl#Thing"):
            # then use it to find all the highest level classes
            return list(OntoClass.is_a[0].subclasses())
    
def convert_classes_to_strings(classes):
    output_list = list(map(lambda x: x.name, classes))
    return output_list

def format_output(classes, probs):
    txt = ""
    template = "{_class}: {_prob}\n"
    for i in range(len(classes)):
        txt += template.format(_class=classes[i], _prob=probs[i])
    txt += "------------------------"
    return txt


def get_children(ontoClass):
    return list(ontoClass.subclasses())

def main_process(ontology_path, image_path):
    # Assumptions
    # 1. There exists root level classes (i.e the ontology is not empty)
    log = ""
    # fetching the ontology
    ontology = fetch_ontology(ontology_path)
    # fetching the root classes
    current_ontology_level = find_root_classes(ontology)
    current_ontology_level_strings = convert_classes_to_strings(current_ontology_level)
    prob_list = image_to_probs(image_path, current_ontology_level_strings)[0].tolist()
    #print('------------------------')
    #print(format_output(current_ontology_level_strings, prob_list))
    log += format_output(current_ontology_level_strings, prob_list)
    
    while True:
        max_index = prob_list.index(max(prob_list))
        chosen_class = current_ontology_level[max_index]

        #print(chosen_class.name + ': ' + str(prob_list[max_index]) + '\n------------------------')
        log += '\n'+ chosen_class.name + ': ' + str(prob_list[max_index]) + '\n------------------------\n'

        current_ontology_level = get_children(chosen_class)
        if current_ontology_level == []:
            #print("It's a " + chosen_class.name + '.')
            #print('------------------------')
            log += "\nResult: " + chosen_class.name + '\n------------------------'
            return chosen_class.name, log
        current_ontology_level_strings = convert_classes_to_strings(current_ontology_level)
        prob_list = image_to_probs(image_path, current_ontology_level_strings)[0].tolist()
        #print(format_output(current_ontology_level_strings, prob_list))
        log += format_output(current_ontology_level_strings, prob_list)


    # goes inside while loop until get_children returns []
    # running it one level below
    # choosing the one with the highest prob
    

    return 

